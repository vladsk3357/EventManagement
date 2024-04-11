using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Sessions.Commands.DeleteSession;

[Authorize]
public sealed record DeleteSessionCommand(int Id) : IRequest;

internal sealed class DeleteSessionCommandHandler : IRequestHandler<DeleteSessionCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public DeleteSessionCommandHandler(IApplicationDbContext context, ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(DeleteSessionCommand request, CancellationToken cancellationToken)
    {
        var session = await _context.Sessions.Include(s => s.Event)
            .FirstOrDefaultAsync(s => s.Id == request.Id && s.Event.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.Id), "Доповіді не існує.");

        _context.Sessions.Remove(session);
        await _context.SaveChangesAsync(cancellationToken);
    }
}   
