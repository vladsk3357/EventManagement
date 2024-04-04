using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.ChangeAttendeeStatus;

public sealed record ChangeAttendeeStatusCommand(
    int Id,
    EventAttendeeStatus Status) : IRequest;

public enum EventAttendeeStatus
{
    Confirmed = 1,
    Cancelled = 2
}

internal sealed class ChangeAttendeeStatusHandler : IRequestHandler<ChangeAttendeeStatusCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public ChangeAttendeeStatusHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(ChangeAttendeeStatusCommand request, CancellationToken cancellationToken)
    {
        var attendee = await _context.Attendees
            .Include(a => a.Event)
            .SingleOrDefaultAsync(
                a => a.Id == request.Id && a.Event.OrganizerId == _currentUserAccessor.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(Attendee), request.Id);

        if (attendee.Status == AttendeeStatus.Cancelled)
            throw new InvalidRequestException(nameof(request.Status), "Cannot change status of a cancelled attendee.");

        if (attendee.Status == AttendeeStatus.Confirmed)
            throw new InvalidRequestException(nameof(request.Status), "Cannot change status of a confirmed attendee.");

        attendee.Status = request.Status switch
        {
            EventAttendeeStatus.Confirmed => AttendeeStatus.Confirmed,
            EventAttendeeStatus.Cancelled => AttendeeStatus.Cancelled,
            _ => throw new ArgumentOutOfRangeException(nameof(request.Status))
        };

        await _context.SaveChangesAsync(cancellationToken);
    }
}
