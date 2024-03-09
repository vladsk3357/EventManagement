using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using MediatR;

namespace EventManagement.Application.Events.Commands.CancelEventAttendance;

public sealed record CancelEventAttendanceCommand(int EventId) : IRequest;

internal sealed class CancelEventAttendanceCommandHandler : IRequestHandler<CancelEventAttendanceCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public CancelEventAttendanceCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(CancelEventAttendanceCommand request, CancellationToken cancellationToken)
    {
        var attendance = await _context.GetAttendeeAsync(request.EventId, _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.EventId), "Користувач не відвідує цю подію.");

        _context.Attendees.Remove(attendance);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
