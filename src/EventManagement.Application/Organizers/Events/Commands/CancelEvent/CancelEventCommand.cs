using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.CancelEvent;

[Authorize]
public sealed record CancelEventCommand(int EventId) : IRequest;

internal sealed class CancelEventCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor) : IRequestHandler<CancelEventCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task Handle(CancelEventCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == request.EventId 
                && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.EventId);

        if (@event.StartDate < DateTime.UtcNow)
            throw new InvalidRequestException(nameof(request.EventId), "Cannot cancel event that has already started");

        if (@event.IsCancelled)
            throw new InvalidRequestException(nameof(request.EventId), "Event is already canceled");

        @event.IsCancelled = true;
        @event.DomainEvents.Add(new EventCancelledEvent(@event.Id));
        await _context.SaveChangesAsync(cancellationToken);
    }
}

