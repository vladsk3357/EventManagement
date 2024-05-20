using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Queries.GetCommunities;

[Authorize]
public sealed record GetCommunitiesQuery(
    string? SortBy,
    string? SortOrder,
    int Page,
    int PageSize,
    string[]? Location,
    string[]? Domain) : PagedRequest(Page, PageSize), IRequest<PagedList<CommunityDto>>;

internal sealed class GetCommunitiesQueryHandler(
    IApplicationDbContext context,
    ICommunitiesSearchService communitiesSearchService,
    IFileStorageService fileStorageService) : IRequestHandler<GetCommunitiesQuery, PagedList<CommunityDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICommunitiesSearchService _communitiesSearchService = communitiesSearchService;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task<PagedList<CommunityDto>> Handle(GetCommunitiesQuery request, CancellationToken cancellationToken)
    {
        var searchRequest = new SearchRequest<CommunityIndexDocument>
        {
            Page = request.Page - 1,
            PageSize = request.PageSize,
            SortBy = request.SortBy,
            IsSortAscending = request.SortOrder == SearchRequestSortingOrder.Ascending,
        };

        if (request.Location is not null)
        {
            searchRequest.Filters.Add(new TextFilter<CommunityIndexDocument>(c => c.Location, request.Location));
        }

        if (request.Domain is not null)
        {
            searchRequest.Filters.Add(new TextFilter<CommunityIndexDocument>(c => c.Domain, request.Domain));
        }

        var searchResult = await _communitiesSearchService.SearchAsync(searchRequest, cancellationToken);
        var communities = await _context.Communities
            .Where(c => searchResult.Results.Select(r => r.Id).Contains(c.Id))
            .ToDictionaryAsync(c => c.Id, cancellationToken);

        var images = communities.Values.Select(c => c.CommunityImage)
            .Where(i => i is not null)
            .Cast<string>()
            .ToList();

        var communityImages = await _fileStorageService.GetFileUrlsAsync(images, cancellationToken);

        var dtos = new List<CommunityDto>();
        foreach (var result in searchResult.Results)
        {
            var community = communities[result.Id];
            string? communityImage = null;
            if (community.CommunityImage is not null && communityImages.TryGetValue(community.CommunityImage, out var imageUrl))
                communityImage = imageUrl.ToString();

            dtos.Add(new CommunityDto(
                result.Id,
                result.Name,
                result.Location,
                communityImage,
                result.Domain,
                result.SubscribersCount));
        }

        return new PagedList<CommunityDto>(
            dtos,
            searchResult.Page,
            searchResult.PageSize,
            searchResult.Total);
    }
}
