using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Speakers.Commands.EditSpeaker;

public sealed record EditSpeakerCommand(
    int Id,
    string Name,
    string Title,
    string Company,
    string Bio) : IRequest;

internal sealed class EditSpeakerCommandHandler : IRequestHandler<EditSpeakerCommand>
{
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IApplicationDbContext _context;

    public EditSpeakerCommandHandler(ICurrentUserAccessor currentUserAccessor, IApplicationDbContext context)
    {
        _currentUserAccessor = currentUserAccessor;
        _context = context;
    }

    public async Task Handle(EditSpeakerCommand request, CancellationToken cancellationToken)
    {
        var speaker = await _context.Speakers
           .Include(s => s.Event)
           .FirstOrDefaultAsync(s => s.Id == request.Id && s.Event.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
           ?? throw new InvalidRequestException(nameof(request.Id), "Спікера не існує.");

        UpdateSpeakerWithCommand(speaker, request);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private static void UpdateSpeakerWithCommand(Speaker speaker, EditSpeakerCommand request)
    {
        speaker.Name = request.Name;
        speaker.Title = request.Title;
        speaker.Company = request.Company;
        speaker.Bio = request.Bio;
    }
}
