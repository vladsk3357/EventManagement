using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
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
    ICollection<int> SpeakerIds) : IRequest;

internal sealed class EditSessionCommandHandler : IRequestHandler<EditSessionCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public EditSessionCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

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

        ////var sessionsSpeakerIds = session.Speakers.Select(s => s.Id).ToList();
        ////foreach (var speakerId in request.SpeakerIds)
        ////{
        ////    if (sessionsSpeakerIds.Contains())
        ////}

        //var speakers = session.Event.Speakers.Where(s => speakersSet.Contains(s.Id)).ToList();

        //speakers.ForEach(session.Speakers.Add);
        
        //foreach (var speakerId in request.SpeakerIds)
        //{
        //    if (!session.Speakers.Any(s => s.Id == speakerId))
        //    {
        //        session.Speakers.Add(session.Event.Speakers.First(s => s.Id == speakerId));
        //    }
        //}

        //foreach (var speaker in session.Speakers)
        //{
        //    if (!request.SpeakerIds.Contains(speaker.Id))
        //    {
        //        session.Speakers.Remove(speaker);
        //    }
        //}
    }
}
