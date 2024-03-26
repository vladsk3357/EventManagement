namespace EventManagement.Application.Search.Queries.Search.Request;

public sealed record class SearchRequestDto(
    string IndexName,
    string SearchTerm,
    int PageSize);
