using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Sessions.Queries.GetSessions;

[Authorize]
public sealed record GetSessionsQuery(int EventId) : IRequest<GetSessionsResult>;

internal sealed class GetSessionsQueryHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor) 
    : IRequestHandler<GetSessionsQuery, GetSessionsResult>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task<GetSessionsResult> Handle(GetSessionsQuery request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .FirstOrDefaultAsync(s => s.Id == request.EventId && s.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.EventId);

        var sessionsQuery = _context.Sessions
            .Include(s => s.Speakers)
            .Where(s => s.EventId == request.EventId);

        var sessionDtos = await sessionsQuery
            .OrderBy(s => s.StartTime)
            .Select(s => s.ToDto())
            .ToListAsync(cancellationToken);

        return new GetSessionsResult(sessionDtos);
    }
}