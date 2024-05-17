using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Sessions.Commands.EditSession;

[Authorize]
public sealed record EditSessionCommand(
    int Id,
    string Title,
    DateTime StartTime,
    int Duration,
    string Description,
    string Level,
    ICollection<int> SpeakerIds) : IRequest;

internal sealed class EditSessionCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor) 
    : IRequestHandler<EditSessionCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task Handle(EditSessionCommand request, CancellationToken cancellationToken)
    {
        var session = await _context.Sessions.Include(s => s.Speakers).Include(s => s.Event).ThenInclude(e => e.Speakers)
            .FirstOrDefaultAsync(s => s.Id == request.Id && s.Event.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.Id), "Доповіді не існує.");

        var eventSpeakersSet = session.Event.Speakers.Select(s => s.Id).ToHashSet();
        var speakersSet = request.SpeakerIds.ToHashSet();

        if (!speakersSet.IsSubsetOf(eventSpeakersSet))
            throw new InvalidRequestException(nameof(request.SpeakerIds), "Один або декілька доповідачів не відносяться до цієї події.");

        UpdateSessionWithCommand(session, request);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private static void UpdateSessionWithCommand(Session session, EditSessionCommand request)
    {
        session.Title = request.Title;
        session.StartTime = request.StartTime;
        session.Duration = TimeSpan.FromMinutes(request.Duration);
        session.Description = request.Description;
        session.Speakers.Clear();
        session.Speakers = session.Event.Speakers.Where(s => request.SpeakerIds.Contains(s.Id)).ToList();
        session.Level = request.Level;
    }
}
