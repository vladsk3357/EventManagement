using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Queries.GetEvent;

[Authorize]
public sealed record GetEventQuery(int Id) : IRequest<EventDto>;

public sealed record EventDto(
    int Id,
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    AttendanceDto Attendance,
    EventVenueDto Venue,
    int CommunityId);

internal class GetEventQueryHandler : IRequestHandler<GetEventQuery, EventDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetEventQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<EventDto> Handle(GetEventQuery request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .Include(e => e.Community)
            .SingleOrDefaultAsync(e => e.Id == request.Id && e.Community.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.Id);

        return new EventDto(
            @event.Id,
            @event.Name,
            @event.Description,
            @event.StartDate,
            @event.EndDate,
            new AttendanceDto(@event.Attendance.Limit, @event.Attendance.ShouldBeApproved),
            @event.Venue.ToDto(),
            @event.CommunityId);
    }
}
