using EventManagement.Application.Common.Pagination;

namespace EventManagement.Application.Search.Queries.Search.Response;

public sealed record SearchResultDto(
    string IndexName,
    PagedList<object> List);
