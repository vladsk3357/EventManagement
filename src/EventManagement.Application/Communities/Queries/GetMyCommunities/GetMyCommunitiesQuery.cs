using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Queries.GetMyCommunities;

public sealed record GetMyCommunitiesQuery() : IRequest<NonPagedList<GetMyCommunitiesDto>>;

internal sealed class GetMyCommunitiesQueryHandler : IRequestHandler<GetMyCommunitiesQuery, NonPagedList<GetMyCommunitiesDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetMyCommunitiesQueryHandler(IApplicationDbContext context, ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<NonPagedList<GetMyCommunitiesDto>> Handle(GetMyCommunitiesQuery request, CancellationToken cancellationToken)
    {
        var communities = await _context.Subscriptions.Include(s => s.Community)
            .ThenInclude(c => c.Subscriptions)
            .Where(s => s.UserId == _currentUserAccessor.UserId)
            .Select(s => new GetMyCommunitiesDto(s.Community.Id, s.Community.Name, s.Community.Subscriptions.Count, s.Community.OrganizerId == _currentUserAccessor.UserId))
            //.OrderBy(c => c.IsOwner)
            .ToListAsync(cancellationToken);

        return new NonPagedList<GetMyCommunitiesDto>(communities);
    }
}
