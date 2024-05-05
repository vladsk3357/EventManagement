using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Abstractions;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.AddImages;

[Authorize]
public sealed record AddImagesCommand(int EventId, IFile[] Images) : IRequest;

internal sealed class AddImagesCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    IFileStorageService fileStorageService) : IRequestHandler<AddImagesCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    async Task IRequestHandler<AddImagesCommand>.Handle(AddImagesCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events.FirstOrDefaultAsync(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken) 
            ?? throw new NotFoundException(nameof(Event), request.EventId);

        foreach (var image in request.Images)
        {
            var (uri, fileName) = await _fileStorageService.SaveAsync(image, cancellationToken);

            @event.Images.Add(new EventImage { FileName = fileName});
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
