using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Common.Pagination;

public class PagedList<T>(List<T> items, int page, int pageSize, long totalCount)
{
    public List<T> Items { get; } = items;

    public int Page { get; } = page;

    public int PageSize { get; } = pageSize;

    public long TotalCount { get; } = totalCount;

    public bool HasNextPage => Page * PageSize < TotalCount;

    public bool HasPreviousPage => Page > 1;

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int page, int pageSize)
    {
        var totalCount = await source.CountAsync();
        var items = await source.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PagedList<T>(items, page, pageSize, totalCount);
    }

    public static PagedList<T> Create(List<T> items, int page, int pageSize, int totalCount)
    {
        ArgumentNullException.ThrowIfNull(items, nameof(items));
        return new PagedList<T>(items, page, pageSize, totalCount);
    }
}
