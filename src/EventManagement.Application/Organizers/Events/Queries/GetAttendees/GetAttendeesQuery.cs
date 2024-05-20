using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Queries.GetAttendees;

[Authorize]
public sealed record GetAttendeesQuery(
    int EventId,
    AttendeeStatus? Status,
    int Page,
    int PageSize) : PagedRequest(Page, PageSize), IRequest<PagedList<AttendeeDto>>;

internal sealed class GetAttendeesQueryHandler : IRequestHandler<GetAttendeesQuery, PagedList<AttendeeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUserService _userService;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetAttendeesQueryHandler(
        IApplicationDbContext context,
        IUserService userService,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _userService = userService;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<PagedList<AttendeeDto>> Handle(GetAttendeesQuery request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.EventId);

        var attendeesQuery = _context.Attendees.AsQueryable();

        if (request.Status.HasValue)
            attendeesQuery = attendeesQuery.Where(a => a.EventId == request.EventId && a.Status == request.Status);

        var totalCount = await attendeesQuery.CountAsync(cancellationToken);

        var attendees = await attendeesQuery.Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var users = await _userService.GetUsersByIdListAsync(attendees.Select(a => a.UserId), cancellationToken);
        var usersDict = users.ToDictionary(u => u.Id);

        var attendeesDto = attendees.Select(a => new AttendeeDto(a.Id, a.UserId, usersDict[a.UserId].UserName, usersDict[a.UserId].Name, a.Created))
            .ToList();

        return PagedList<AttendeeDto>.Create(attendeesDto, request.Page, request.PageSize, totalCount);
    }
}

