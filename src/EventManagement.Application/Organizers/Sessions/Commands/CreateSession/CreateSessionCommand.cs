using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Sessions.Commands.CreateSession;

[Authorize]
public sealed record CreateSessionCommand(
    string Title,
    DateTime StartTime,
    TimeSpan Duration,
    string Description,
    ICollection<int> SpeakerIds,
    int EventId) : IRequest<CreateSessionCommandResult>;

internal sealed class CreateSessionCommandHandler : IRequestHandler<CreateSessionCommand, CreateSessionCommandResult>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public CreateSessionCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<CreateSessionCommandResult> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events.FirstOrDefaultAsync(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.EventId), "Події не існує.");

        var session = request.ToEntity();
        await _context.Sessions.AddAsync(session, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CreateSessionCommandResult(session.Id);
    }
}
