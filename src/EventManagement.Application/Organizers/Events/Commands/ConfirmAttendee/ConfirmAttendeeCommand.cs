using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.ConfirmAttendee;

public sealed record ConfirmAttendeeCommand(int Id) : IRequest;

internal sealed class ConfirmAttendeeHandler : IRequestHandler<ConfirmAttendeeCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public ConfirmAttendeeHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(ConfirmAttendeeCommand request, CancellationToken cancellationToken)
    {
        var attendee = await _context.Attendees
            .Include(a => a.Event)
            .SingleOrDefaultAsync(
                a => a.Id == request.Id && a.Event.OrganizerId == _currentUserAccessor.UserId,
                cancellationToken)
            ?? throw new NotFoundException(nameof(Attendee), request.Id);

        if (attendee.Status == AttendeeStatus.Confirmed)
            throw new InvalidRequestException(nameof(request.Id), "Attendee is already confirmed.");

        attendee.Status = AttendeeStatus.Confirmed;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
