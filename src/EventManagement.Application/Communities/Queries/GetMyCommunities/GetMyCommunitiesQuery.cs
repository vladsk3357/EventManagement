using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Queries.GetMyCommunities;

public sealed record GetMyCommunitiesQuery() : IRequest<NonPagedList<GetMyCommunitiesDto>>;

internal sealed class GetMyCommunitiesQueryHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    IFileStorageService fileStorageService)
    : IRequestHandler<GetMyCommunitiesQuery, NonPagedList<GetMyCommunitiesDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task<NonPagedList<GetMyCommunitiesDto>> Handle(GetMyCommunitiesQuery request, CancellationToken cancellationToken)
    {
        var communities = await _context.Subscriptions.Include(s => s.Community)
            .ThenInclude(c => c.Subscriptions)
            .Where(s => s.UserId == _currentUserAccessor.UserId)
            .Select(s => s.Community)
            .ToListAsync(cancellationToken);

        var images = communities.Select(c => c.CommunityImage)
            .Where(i => i is not null)
            .Cast<string>()
            .ToList();

        var communityImages = await _fileStorageService.GetFileUrlsAsync(images, cancellationToken);

        var dtos = communities.Select(c => new GetMyCommunitiesDto(
            c.Id,
            c.Name,
            c.Subscriptions.Count,
            c.OrganizerId == _currentUserAccessor.UserId,
            c.CommunityImage is not null ? communityImages[c.CommunityImage].ToString() : null))
            .ToList();

        return new NonPagedList<GetMyCommunitiesDto>(dtos);
    }
}
