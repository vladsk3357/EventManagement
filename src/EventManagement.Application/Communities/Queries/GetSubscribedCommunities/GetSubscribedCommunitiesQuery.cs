﻿using EventManagement.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Queries.GetSubscribedCommunities;

public sealed record GetSubscribedCommunitiesQuery() : IRequest<List<CommunityDto>>;

internal class GetSubscribedCommunitiesQueryHandler(
    IApplicationDbContext context, 
    ICurrentUserAccessor currentUserAccessor) 
    : IRequestHandler<GetSubscribedCommunitiesQuery, List<CommunityDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task<List<CommunityDto>> Handle(GetSubscribedCommunitiesQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId;

        var communities = await _context.Subscriptions
            .Where(cm => cm.UserId == userId)
            .Include(cm => cm.Community)
            .ToListAsync(cancellationToken);

        return communities.Select(cm =>
            new CommunityDto(cm.CommunityId, cm.Community.Name))
            .ToList();
    }
}
