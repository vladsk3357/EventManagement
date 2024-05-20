using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Organizers.Communities.Queries.GetCommunity;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunities;

[Authorize]
public sealed record GetCommunitiesQuery() : IRequest<NonPagedList<CommunityDto>>;

internal sealed class GetMyCommunitiesQueryHandler(
    ICurrentUserAccessor currentUserAccessor,
    IApplicationDbContext context,
    IFileStorageService fileStorageService)
        : IRequestHandler<GetCommunitiesQuery, NonPagedList<CommunityDto>>
{
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IApplicationDbContext _context = context;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task<NonPagedList<CommunityDto>> Handle(GetCommunitiesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Communities.Where(c => c.OrganizerId == _currentUserAccessor.UserId);
        var communities = await query.ToListAsync(cancellationToken);

        var images = communities.Select(c => c.CommunityImage)
           .Where(i => i is not null)
           .Cast<string>()
           .ToList();

        var communityImages = await _fileStorageService.GetFileUrlsAsync(images, cancellationToken);
        var communityDtos = communities.Select(c => c.ToDto(
            c.CommunityImage is not null 
            ? communityImages[c.CommunityImage].ToString() 
            : null))
            .ToList();

        return new NonPagedList<CommunityDto>(communityDtos);
    }
}
