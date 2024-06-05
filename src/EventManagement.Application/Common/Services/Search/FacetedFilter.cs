namespace EventManagement.Application.Common.Services.Search;

public class FacetedFilter(IEnumerable<Facet> facets)
{
    public IEnumerable<Facet> Facets { get; set; } = facets;
}
