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
    int Duration,
    string Description,
    string Level,
    ICollection<int> SpeakerIds,
    int EventId) : IRequest<CreateSessionCommandResult>;

internal sealed class CreateSessionCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor) 
    : IRequestHandler<CreateSessionCommand, CreateSessionCommandResult>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task<CreateSessionCommandResult> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .Include(e => e.Speakers)
            .FirstOrDefaultAsync(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.EventId), "Події не існує.");

        var eventSpeakersSet = @event.Speakers.Select(s => s.Id).ToHashSet();
        var speakersSet = request.SpeakerIds.ToHashSet();

        if (!speakersSet.IsSubsetOf(eventSpeakersSet))
            throw new InvalidRequestException(nameof(request.SpeakerIds), "Один або декілька доповідачів не відносяться до цієї події.");

        var session = request.ToEntity();
        session.Speakers = @event.Speakers.Where(s => speakersSet.Contains(s.Id)).ToList();

        await _context.Sessions.AddAsync(session, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CreateSessionCommandResult(session.Id);
    }
}
