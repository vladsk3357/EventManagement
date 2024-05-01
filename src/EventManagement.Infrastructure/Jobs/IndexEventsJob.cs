using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Domain.Entities.CommunityEvent;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;

namespace EventManagement.Infrastructure.Jobs;

internal class IndexEventsJob(
    IApplicationDbContext context,
    IEventsSearchService searchService,
    IDateTime dateTime,
    ILogger<IndexEventsJob> logger) : IJob
{
    private readonly IApplicationDbContext _context = context;
    private readonly IEventsSearchService _searchService = searchService;
    private readonly IDateTime _dateTime = dateTime;
    private readonly ILogger<IndexEventsJob> _logger = logger;

    public async Task Execute(IJobExecutionContext context)
    {
        _logger.LogWarning("Indexing events");

        var events = await _context.Events.Include(e => e.Attendees).ToListAsync();

        events.Select(e => new EventIndexDocument(
            e.Id,
            e.Name,
            e.Description,
            e.CommunityId,
            e.StartDate,
            e.EndDate,
            e.Attendees.Count,
            e.Venue switch
            {
                OfflineEventVenue offline => offline.Address.City,
                OnlineEventVenue => "онлайн",
                _ => throw new ArgumentException("Event type is not handled."),
            }))
            .ToList()
            .ForEach(async e => await _searchService.IndexAsync(e));

        _logger.LogWarning("Indexing events completed");
    }
}

