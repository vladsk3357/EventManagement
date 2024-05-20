using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using MediatR;

namespace EventManagement.Application.Search.Queries.SearchSuggestions;

public sealed record SearchSuggestionsQuery(string Q, int PageSize = 5) : IRequest<SearchSuggestionsResult>;

public sealed record SearchSuggestionsResult(
    ICollection<CommunitySuggestions> Communities, 
    ICollection<EventSuggestions> Events);

public sealed record CommunitySuggestions(int Id, string Name);

public sealed record EventSuggestions(int Id, string Name, int CommunityId);

internal sealed class SearchSuggestionsQueryHandler(ICommunitiesSearchService searchService, IEventsSearchService eventsSearchService) : IRequestHandler<SearchSuggestionsQuery, SearchSuggestionsResult>
{
    private readonly ICommunitiesSearchService _searchService = searchService;
    private readonly IEventsSearchService _eventsSearchService = eventsSearchService;

    public async Task<SearchSuggestionsResult> Handle(SearchSuggestionsQuery request, CancellationToken cancellationToken)
    {
        var communitiesSearchResult = await _searchService.Suggest(request.Q, request.PageSize);
        var eventsSearchResult = await _eventsSearchService.SuggestAsync(request.Q, request.PageSize);

        return new SearchSuggestionsResult(
            communitiesSearchResult.Results.Select(r => new CommunitySuggestions(r.Id, r.Name)).ToList(),
            eventsSearchResult.Results.Select(r => new EventSuggestions(r.Id, r.Name, r.CommunityId)).ToList());
    }
}
