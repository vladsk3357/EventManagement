﻿using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Services.Search;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;

namespace EventManagement.Infrastructure.Jobs;

internal class IndexCommunitiesJob(
    IApplicationDbContext context, 
    ICommunitiesSearchService searchService, 
    IDateTime dateTime,
    ILogger<IndexCommunitiesJob> logger) : IJob
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICommunitiesSearchService _searchService = searchService;
    private readonly IDateTime _dateTime = dateTime;
    private readonly ILogger<IndexCommunitiesJob> _logger = logger;

    public async Task Execute(IJobExecutionContext context)
    {
        _logger.LogWarning("Indexing communities");

        var communities = await _context.Communities.ToListAsync();
        communities.ForEach(async c => await _searchService.IndexAsync(c));

        _logger.LogWarning("Indexing communities completed");
    }
}