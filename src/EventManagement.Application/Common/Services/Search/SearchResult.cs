namespace EventManagement.Application.Services.Search;

public class SearchResult<T>(IEnumerable<T> results, long total) where T : class
{
    public IEnumerable<T> Results { get; } = results;

    public long Total { get; } = total;
}
