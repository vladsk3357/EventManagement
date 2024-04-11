using System.Linq.Expressions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Domain.Entities;
using MediatR;

namespace EventManagement.Application.Communities.Queries.GetCommunities;

public sealed record GetCommunitiesQuery(
    string? SearchTerm,
    string? SortBy,
    string? SortOrder,
    int Page,
    int PageSize) : PagedRequest(Page, PageSize), IRequest<PagedList<CommunityDto>>;

internal sealed class GetCommunitiesQueryHandler : IRequestHandler<GetCommunitiesQuery, PagedList<CommunityDto>>
{
    private readonly IApplicationDbContext _context;

    public GetCommunitiesQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<PagedList<CommunityDto>> Handle(GetCommunitiesQuery request, CancellationToken cancellationToken)
    {
        var communitiesQuery = _context.Communities.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            communitiesQuery = communitiesQuery.Where(c => c.Name.Contains(request.SearchTerm)
            || c.Description.Contains(request.SearchTerm)
            || c.Domain.Contains(request.SearchTerm)
            || (!string.IsNullOrWhiteSpace(c.ShortDescription) && c.ShortDescription.Contains(request.SearchTerm))
            || c.Location.Contains(request.SearchTerm));

        communitiesQuery = request.SortOrder?.ToLower() == "desc"
            ? communitiesQuery.OrderByDescending(GetSortProperty(request))
            : communitiesQuery.OrderBy(GetSortProperty(request));

        var communitiesDtosQuery = communitiesQuery.Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(c => new CommunityDto(c.Id, c.Name, c.Location));

        return await PagedList<CommunityDto>.CreateAsync(communitiesDtosQuery, request.Page, request.PageSize);
    }

    private static Expression<Func<Community, object>> GetSortProperty(GetCommunitiesQuery request)
        => request.SortBy?.ToLower() switch
        {
            "name" => c => c.Name,
            "domain" => c => c.Domain,
            "location" => c => c.Location,
            _ => c => c.Id
        };
}
