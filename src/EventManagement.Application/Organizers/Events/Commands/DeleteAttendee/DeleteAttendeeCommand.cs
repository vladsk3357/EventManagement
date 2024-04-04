using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.DeleteAttendee;

[Authorize]
public sealed record DeleteAttendeeCommand(int Id) : IRequest;

internal class DeleteAttendeeCommandHandler : IRequestHandler<DeleteAttendeeCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public DeleteAttendeeCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(DeleteAttendeeCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Attendees.Include(a => a.Event)
            .SingleOrDefaultAsync(a => a.Id == request.Id && a.Event.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Attendee), request.Id);

        _context.Attendees.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
