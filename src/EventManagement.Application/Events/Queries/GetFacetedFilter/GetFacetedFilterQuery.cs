using EventManagement.Application.Common.Services.Search;
using MediatR;

namespace EventManagement.Application.Events.Queries.GetFacetedFilter;

public sealed record GetFacetedFilterQuery() : IRequest<FacetedFilter>;

public sealed record FacetedFilterDto();

internal sealed class GetFacetedFilterQueryHandler(IEventsSearchService searchService) 
    : IRequestHandler<GetFacetedFilterQuery, FacetedFilter>
{
    private readonly IEventsSearchService _searchService = searchService;

    public async Task<FacetedFilter> Handle(GetFacetedFilterQuery request, CancellationToken cancellationToken)
    {
        return await _searchService.GetFacetedFilterAsync(cancellationToken);
    }
}
