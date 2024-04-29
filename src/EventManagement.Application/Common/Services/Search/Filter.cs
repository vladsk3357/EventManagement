using System.Linq.Expressions;

namespace EventManagement.Application.Common.Services.Search;

public sealed class Filter<T>(Expression<Func<T, object>> fieldSelector, object[] values)
{
    public Expression<Func<T, object>> FieldSelector { get; set; } = fieldSelector;

    public object[] Values { get; set; } = values;
}
