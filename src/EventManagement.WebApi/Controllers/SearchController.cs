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
}
