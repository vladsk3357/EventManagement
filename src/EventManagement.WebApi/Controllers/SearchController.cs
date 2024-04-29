using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Communities.Queries.GetCommunities;
using EventManagement.Application.Communities.Queries.GetFacetedFilter;
using EventManagement.Application.Events.Queries.GetEvents;
using EventManagement.Application.Search.Queries.Search;
using EventManagement.Application.Search.Queries.Search.Response;
using EventManagement.Application.Search.Queries.SearchSuggestions;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

public class SearchController : ApiControllerBase
{
    [HttpGet]
    public async Task<SearchResultDto> SearchAsync(string q, int page, int pageSize)
    {
        return await Mediator.Send(new SearchQuery(q, page, pageSize));
    }

    [HttpGet("suggest")]
    public async Task<SearchSuggestionsResult> SuggestAsync([FromQuery] SearchSuggestionsQuery request)
    {
        return await Mediator.Send(request);
    }

    [HttpGet("discover-communities")]
    public async Task<PagedList<Application.Communities.Queries.GetCommunities.CommunityDto>> DiscoverCommunitiesAsync(
        string? sortBy, 
        string? sortOrder = "asc", 
        int page = 1, 
        int pageSize = 10, 
        string? location = null,
        string? domain = null)
    {
        return await Mediator.Send(new GetCommunitiesQuery(
            sortBy, 
            sortOrder, 
            page, 
            pageSize, 
            location?.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries),
            domain?.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)));
    }

    [HttpGet("communities-faceted-filter")]
    public async Task<FacetedFilter> GetCommunitiesFacetedFilterAsync()
    {
        return await Mediator.Send(new GetFacetedFilterQuery());
    }

    [HttpGet("discover-events")]
    public async Task<PagedList<Application.Events.Queries.GetEvents.EventDto>> DiscoverEventsAsync(
        string? sortBy = "startDate",
        string? sortOrder = "asc",
        int page = 1,
        int pageSize = 10,
        DateTime? startDate = null,
        DateTime? endDate = null)
    {
        return await Mediator.Send(new GetEventsQuery(
            sortBy,
            sortOrder,
            page,
            pageSize,
            startDate,
            endDate));
    }
}
