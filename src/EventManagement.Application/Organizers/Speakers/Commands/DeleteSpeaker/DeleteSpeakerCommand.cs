using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Speakers.Commands.DeleteSpeaker;

public sealed record DeleteSpeakerCommand(int Id) : IRequest;

internal sealed class DeleteSpeakerCommandHandler : IRequestHandler<DeleteSpeakerCommand>
{
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IApplicationDbContext _context;

    public DeleteSpeakerCommandHandler(ICurrentUserAccessor currentUserAccessor, IApplicationDbContext context)
    {
        _currentUserAccessor = currentUserAccessor;
        _context = context;
    }

    public async Task Handle(DeleteSpeakerCommand request, CancellationToken cancellationToken)
    {
        var speaker = await _context.Speakers
            .Include(s => s.Event)
            .FirstOrDefaultAsync(s => s.Id == request.Id && s.Event.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.Id), "Спікера не існує.");

        var sessions = await _context.Sessions
            .Where(s => s.Speakers.Any(speaker => speaker.Id == request.Id))
            .ToListAsync(cancellationToken);

        if (sessions.Any())
            throw new InvalidRequestException(
                nameof(request.Id), 
                $"Спікер викладає на одній або декількох сесіях: {string.Join(", ", sessions.Select(s => s.Title))}.");

        _context.Speakers.Remove(speaker);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
