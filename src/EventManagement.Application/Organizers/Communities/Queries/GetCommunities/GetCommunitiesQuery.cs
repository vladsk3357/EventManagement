using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunities;

[Authorize]
public sealed record GetCommunitiesQuery() : IRequest<NonPagedList<CommunityDto>>;

internal sealed class GetMyCommunitiesQueryHandler
    : IRequestHandler<GetCommunitiesQuery, NonPagedList<CommunityDto>>
{
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IApplicationDbContext _context;

    public GetMyCommunitiesQueryHandler(
        ICurrentUserAccessor currentUserAccessor,
        IApplicationDbContext context)
    {
        _currentUserAccessor = currentUserAccessor;
        _context = context;
    }

    public async Task<NonPagedList<CommunityDto>> Handle(GetCommunitiesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Communities.Where(c => c.OrganizerId == _currentUserAccessor.UserId);
        var communities = await query.ToListAsync(cancellationToken);
        var communityDtos = communities.Select(c => c.ToDto()).ToList();

        return new NonPagedList<CommunityDto>(communityDtos);
    }
}
