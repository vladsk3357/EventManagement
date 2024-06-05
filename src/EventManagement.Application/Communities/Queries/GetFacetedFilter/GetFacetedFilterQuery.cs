using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using MediatR;

namespace EventManagement.Application.Communities.Queries.GetFacetedFilter;

public sealed record GetFacetedFilterQuery() : IRequest<FacetedFilter>;

public sealed record FacetedFilterDto();

internal sealed class GetFacetedFilterQueryHandler(ICommunitiesSearchService communitiesSearchService) 
    : IRequestHandler<GetFacetedFilterQuery, FacetedFilter>
{
    private readonly ICommunitiesSearchService _communitiesSearchService = communitiesSearchService;

    public async Task<FacetedFilter> Handle(GetFacetedFilterQuery request, CancellationToken cancellationToken)
    {
        return await _communitiesSearchService.GetFacetedFilterAsync(cancellationToken);
    }
}
