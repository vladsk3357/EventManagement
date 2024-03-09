using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Speakers.Commands.CreateSpeaker;

public record CreateSpeakerCommand(
    string Name,
    string Title,
    string Company,
    string Bio,
    int EventId)
    : IRequest<CreateSpeakerCommandResult>;

internal sealed class CreateSpeakerCommandHandler : IRequestHandler<CreateSpeakerCommand, CreateSpeakerCommandResult>
{
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IApplicationDbContext _context;

    public CreateSpeakerCommandHandler(ICurrentUserAccessor currentUserAccessor, IApplicationDbContext context)
    {
        _currentUserAccessor = currentUserAccessor;
        _context = context;
    }

    public async Task<CreateSpeakerCommandResult> Handle(CreateSpeakerCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.EventId), "Подія не існує.");

        var speaker = request.ToEntity();

        await _context.Speakers.AddAsync(speaker, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CreateSpeakerCommandResult(speaker.Id);
    }
}
