namespace EventManagement.Application.Common.Services.Search;

public class Facet(string name, IEnumerable<FacetValue> values)
{
    public string Name { get; } = name;

    public IEnumerable<FacetValue> Values { get; } = values;
}
