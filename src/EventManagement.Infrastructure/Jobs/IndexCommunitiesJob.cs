using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Services.Search;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;

namespace EventManagement.Infrastructure.Jobs;

internal class IndexCommunitiesJob(
    IApplicationDbContext context, 
    ISearchService searchService, 
    IDateTime dateTime,
    ILogger<IndexCommunitiesJob> logger) : IJob
{
    private readonly IApplicationDbContext _context = context;
    private readonly ISearchService _searchService = searchService;
    private readonly IDateTime _dateTime = dateTime;
    private readonly ILogger<IndexCommunitiesJob> _logger = logger;

    public async Task Execute(IJobExecutionContext context)
    {
        _logger.LogWarning("Indexing communities at {Time}", _dateTime.Now);

        var communities = await _context.Communities.ToListAsync();
        communities.ForEach(async c => await _searchService.IndexCommunityAsync(c));

        _logger.LogWarning("Indexing completed at {Time}", _dateTime.Now);
    }
}
