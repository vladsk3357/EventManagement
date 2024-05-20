using System.Linq.Expressions;

namespace EventManagement.Application.Common.Services.Search;

public abstract class Filter<T>(Expression<Func<T, object>> fieldSelector)
{
    public Expression<Func<T, object>> FieldSelector { get; set; } = fieldSelector;
}
public sealed class TextFilter<T>(Expression<Func<T, object>> fieldSelector, object[] values) : Filter<T>(fieldSelector)
{
    public Expression<Func<T, object>> FieldSelector { get; set; } = fieldSelector;

    public object[] Values { get; set; } = values;
}

public sealed class RangeFilter<T>(Expression<Func<T, object>> fieldSelector, object? from, object? to) : Filter<T>(fieldSelector)
{
    public Expression<Func<T, object>> FieldSelector { get; set; } = fieldSelector;

    public object? From { get; set; } = from;

    public object? To { get; set; } = to;
}