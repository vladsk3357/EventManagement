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
    TimeSpan Duration,
    string Description,
    ICollection<int> SpeakerIds,
    int EventId) : IRequest;

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
        var session = await _context.Sessions.Include(s => s.Event)
            .FirstOrDefaultAsync(s => s.Id == request.Id && s.Event.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.Id), "Доповіді не існує.");

        UpdateSessionWithCommand(session, request);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private static void UpdateSessionWithCommand(Session session, EditSessionCommand request)
    {
        session.Title = request.Title;
        session.StartTime = request.StartTime;
        session.Duration = request.Duration;
        session.Description = request.Description;
        session.Speakers = request.SpeakerIds.Select(id => new Speaker { Id = id }).ToList();
    }
}   
