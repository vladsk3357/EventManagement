namespace EventManagement.Application.Common.Pagination;

public class NonPagedList<T>
{
    public NonPagedList(IEnumerable<T> items)
    {
        Items = items;
    }

    public IEnumerable<T> Items { get; }
}
