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
            IsSortAscending = request.SortOrder == "asc",
        };

        if (request.Location is not null)
        {
            searchRequest.Filters.Add(new Filter<CommunityIndexDocument>(c => c.Location, request.Location));
        }

        if (request.Domain is not null)
        {
            searchRequest.Filters.Add(new Filter<CommunityIndexDocument>(c => c.Domain, request.Domain));
        }

        var searchResult = await _communitiesSearchService.SearchAsync(searchRequest, cancellationToken);
        var facets = await _communitiesSearchService.GetFacetedFilterAsync(cancellationToken);
        var communities = await _context.Communities
            .Where(c => searchResult.Results.Select(r => r.Id).Contains(c.Id))
            .ToDictionaryAsync(c => c.Id, cancellationToken);

        var images = communities.Values.Select(c => c.CommunityImage)
            .Where(i => i is not null)
            .Cast<string>()
            .ToList();

        var communityImages = await _fileStorageService.GetFileUrlsAsync(images, cancellationToken);

        return new PagedList<CommunityDto>(
            searchResult.Results.Select(c => new CommunityDto(
                c.Id, 
                c.Name, 
                c.Location,
                communities[c.Id].CommunityImage is not null 
                    ? communityImages[communities[c.Id].CommunityImage].ToString() 
                    : null,
                c.Domain,
                c.SubscribersCount)).ToList(),
            searchResult.Page,
            searchResult.PageSize,
            searchResult.Total);
    }
}
