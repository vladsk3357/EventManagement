using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Areas.Admin.Models.Common;

public class PagedViewModel<T>
{
    [FromQuery]
    public int Page { get; set; }

    [FromQuery]
    public int PageSize { get; set; }

    public int TotalCount { get; set; }

    public IEnumerable<T> Items { get; set; }
}
