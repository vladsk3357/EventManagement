using EventManagement.Application.Admin.Common;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Admin.Users.Queries.GetUsers;

[Authorize(Roles = "Admin")]
public sealed record GetUsersQuery(int Page, int PageSize)
    : PagedRequest(Page, PageSize), IRequest<PagedList<UserDto>>;

internal sealed class GetUsersQueryHandler(
    IAdminUserService userService, 
    IApplicationDbContext context) 
    : IRequestHandler<GetUsersQuery, PagedList<UserDto>>
{
    private readonly IAdminUserService _userService = userService;
    private readonly IApplicationDbContext _context = context;

    public async Task<PagedList<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        var (users, totalCount) = await _userService.GetUsersAsync(request.Page, request.PageSize, cancellationToken);
        var userIds = users.Select(u => u.Id).ToList();
        var organizerIds = await _context.Communities
            .Where(c => userIds.Contains(c.OrganizerId))
            .Select(c => c.OrganizerId)
            .Distinct()
            .ToListAsync(cancellationToken);
        var dtos = users.Select(u => new UserDto(
            u.Id, 
            u.Name, 
            u.Email, 
            u.IsLocked, 
            organizerIds.Contains(u.Id)))
            .ToList();
        return PagedList<UserDto>.Create(dtos, request.Page, request.PageSize, totalCount);
    }
}
