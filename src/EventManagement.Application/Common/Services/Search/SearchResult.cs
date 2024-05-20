namespace EventManagement.Application.Services.Search;

public class SearchResult<T>(IEnumerable<T> results, int page, int pageSize, long total) where T : class
{
    public IEnumerable<T> Results { get; } = results;

    public int Page { get; } = page;

    public int PageSize { get; } = pageSize;

    public long Total { get; } = total;
}
