using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Services.Search;
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

        var communities = await _context.Events.ToListAsync();
        communities.ForEach(async c => await _searchService.IndexAsync(c));

        _logger.LogWarning("Indexing events completed");
    }
}

