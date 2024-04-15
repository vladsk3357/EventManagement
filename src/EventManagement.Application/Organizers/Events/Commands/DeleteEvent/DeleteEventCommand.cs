using System.ComponentModel.DataAnnotations;
using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Common.Services.Search;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.DeleteEvent;

[Authorize]
public sealed record DeleteEventCommand(int Id) : IRequest;

internal sealed class DeleteEventCommandHandler : IRequestHandler<DeleteEventCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IEventsSearchService _searchService;

    public DeleteEventCommandHandler(
        IApplicationDbContext context, 
        ICurrentUserAccessor currentUserAccessor, 
        IEventsSearchService searchService)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _searchService = searchService;
    }

    public async Task Handle(DeleteEventCommand request, CancellationToken cancellationToken)
    {
        var eventEntity = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == request.Id && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.Id), "Події не існує.");

        _context.Events.Remove(eventEntity);

        await _context.SaveChangesAsync(cancellationToken);
        await _searchService.DeleteAsync(eventEntity.Id);
    }
}