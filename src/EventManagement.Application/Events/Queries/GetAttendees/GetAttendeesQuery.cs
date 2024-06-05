using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetAttendees;

public sealed record GetAttendeesQuery(int EventId, int Page, int PageSize)
    : PagedRequest(Page, PageSize), IRequest<PagedList<AttendeeDto>>;

internal sealed class GetAttendeesQueryHandler(
    IApplicationDbContext context, 
    IUserService userService)
    : IRequestHandler<GetAttendeesQuery, PagedList<AttendeeDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IUserService _userService = userService;

    public async Task<PagedList<AttendeeDto>> Handle(GetAttendeesQuery request, CancellationToken cancellationToken)
    {
        var attendeesQuery = _context.Attendees.Where(s => s.EventId == request.EventId);

        var totalCount = await attendeesQuery.CountAsync(cancellationToken);
        var attendeesIds = await attendeesQuery.Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(s => s.UserId)
            .ToListAsync(cancellationToken);

        var users = await _userService.GetUsersByIdListAsync(attendeesIds, cancellationToken);
        var dtos = users.Select(u => u.ToDto()).ToList();

        return PagedList<AttendeeDto>.Create(dtos, request.Page, request.PageSize, totalCount);
    }
}
