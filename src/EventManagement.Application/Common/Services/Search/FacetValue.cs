namespace EventManagement.Application.Common.Services.Search;

public class FacetValue(string value, long count)
{
    public string Value { get; } = value;

    public long Count { get; } = count;
}
