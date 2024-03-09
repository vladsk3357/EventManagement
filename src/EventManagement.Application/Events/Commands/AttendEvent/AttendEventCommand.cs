using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Commands.AttendEvent;

public sealed record AttendEventCommand(int EventId) : IRequest;

internal sealed class AttendEventCommandHandler : IRequestHandler<AttendEventCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public AttendEventCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(AttendEventCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId;

        var communityEvent = await _context.Events.AsNoTracking().FirstOrDefaultAsync(e => e.Id == request.EventId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.EventId), "Події не існує.");

        var existingAttendee = await _context.GetAttendeeAsync(request.EventId, userId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.EventId), "Коритувач вже відвідує цю подію.");

        if (communityEvent.Attendance.Limit is not null)
        {
            var attendeeCount = await _context.Attendees
                .CountAsync(a => a.EventId == request.EventId && a.Status == AttendeeStatus.Confirmed, cancellationToken);

            if (attendeeCount >= communityEvent.Attendance.Limit)
                throw new InvalidRequestException(nameof(request.EventId), "Ліміт користувачів вже відвідують подію.");
        }

        var attendee = new Attendee
        {
            UserId = userId,
            EventId = request.EventId,
            Status = communityEvent!.Attendance.ShouldBeApproved
                ? AttendeeStatus.Pending
                : AttendeeStatus.Confirmed,
        };

        await _context.Attendees.AddAsync(attendee, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
