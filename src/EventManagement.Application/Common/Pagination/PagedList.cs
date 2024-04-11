using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Common.Pagination;

public class PagedList<T>
{
    public PagedList(List<T> items, int page, int pageSize, int totalCount)
    {
        Items = items;
        Page = page;
        PageSize = pageSize;
        TotalCount = totalCount;
    }

    public List<T> Items { get; }

    public int Page { get; }

    public int PageSize { get; }

    public int TotalCount { get; }

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
