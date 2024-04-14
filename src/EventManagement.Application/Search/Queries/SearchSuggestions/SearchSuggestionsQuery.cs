using EventManagement.Application.Services.Search;
using MediatR;

namespace EventManagement.Application.Search.Queries.SearchSuggestions;

public sealed record SearchSuggestionsQuery(string Q, int PageSize = 5) : IRequest<SearchSuggestionsResult>;

public sealed record SearchSuggestionsResult(ICollection<CommunitySuggestions> Communities);

public sealed record CommunitySuggestions(int Id, string Name);

internal sealed class SearchSuggestionsQueryHandler(ISearchService searchService) : IRequestHandler<SearchSuggestionsQuery, SearchSuggestionsResult>
{
    private readonly ISearchService _searchService = searchService;

    public async Task<SearchSuggestionsResult> Handle(SearchSuggestionsQuery request, CancellationToken cancellationToken)
    {
        var searchResult = await _searchService.SuggestCommunities(request.Q, request.PageSize);

        return new SearchSuggestionsResult(searchResult.Results.Select(r => new CommunitySuggestions(r.Id, r.Name)).ToList());
    }
}
