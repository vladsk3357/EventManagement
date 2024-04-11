namespace EventManagement.Application.Common.Pagination;

public abstract record PagedRequest(int Page, int PageSize);
