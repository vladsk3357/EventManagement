using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.DeleteImage;

[Authorize]
public sealed record DeleteImageCommand(int EventId, int ImageId) : IRequest;

internal sealed class DeleteImageCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    IFileStorageService fileStorageService) : IRequestHandler<DeleteImageCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task Handle(DeleteImageCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .Include(e => e.Images)
            .FirstOrDefaultAsync(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.EventId);

        var image = @event.Images.FirstOrDefault(i => i.Id == request.ImageId) 
            ?? throw new NotFoundException(nameof(EventImage), request.ImageId);

        @event.Images.Remove(image);
        await _fileStorageService.DeleteIfExistsAsync(image.FileName, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
