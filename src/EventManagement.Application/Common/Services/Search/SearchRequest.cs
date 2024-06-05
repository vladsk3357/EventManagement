namespace EventManagement.Application.Common.Services.Search;

public sealed class SearchRequest<T>
{
    public int Page { get; set; }

    public int PageSize { get; set; }

    public string? SortBy { get; set; }

    public bool IsSortAscending { get; set; }

    public List<Filter<T>> Filters { get; set; } = [];
}
