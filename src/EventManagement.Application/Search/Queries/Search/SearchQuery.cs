using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Search.Queries.Search.Dtos;
using EventManagement.Application.Search.Queries.Search.Request;
using EventManagement.Application.Search.Queries.Search.Response;
using EventManagement.Application.Services.Search;
using MediatR;

namespace EventManagement.Application.Search.Queries.Search;

public sealed record SearchQuery(string Term, int Page, int PageSize) : IRequest<SearchResultDto>;

internal sealed class SearchResultQueryHandler : IRequestHandler<SearchQuery, SearchResultDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICommunitiesSearchService _searchService;

    public SearchResultQueryHandler(
        IApplicationDbContext context,
        ICommunitiesSearchService searchService)
    {
        _context = context;
        _searchService = searchService;
    }

    public async Task<SearchResultDto> Handle(SearchQuery request, CancellationToken cancellationToken)
    {
        var result = await _searchService.SearchCommunity(request.Term, request.Page - 1, request.PageSize);
        return new SearchResultDto(result.Results
            .Select(c => new CommunityDto(c.Id, c.Name, c.Location)).ToList());
    }

    private Task<PagedList<object>> SearchUsers(SearchRequestDto searchRequest, List<SearchResultDto> result)
    {
        throw new NotImplementedException();
    }
}