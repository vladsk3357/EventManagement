namespace EventManagement.Application.Common.Pagination;

public class NonPagedList<T>
{
    public NonPagedList(ICollection<T> items)
    {
        Items = items;
    }

    public ICollection<T> Items { get; }

    public int TotalCount => Items.Count;
}
