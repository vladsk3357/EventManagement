using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Sessions.Queries.GetSessions;

[Authorize]
public sealed record GetSessionsQuery(int EventId, DateTime? Date) : IRequest<GetSessionsResult>;

internal sealed class GetSessionsQueryHandler : IRequestHandler<GetSessionsQuery, GetSessionsResult>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetSessionsQueryHandler(
        IApplicationDbContext context, 
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<GetSessionsResult> Handle(GetSessionsQuery request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .FirstOrDefaultAsync(s => s.Id == request.EventId && s.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.EventId);

        var sessionsQuery = _context.Sessions
            .Include(s => s.Speakers)
            .Where(s => s.EventId == request.EventId);

        sessionsQuery = request.Date is null
            ? sessionsQuery.Where(s => s.StartTime.Date == @event.StartDate.Date)
            : sessionsQuery.Where(s => s.StartTime.Date == request.Date.Value.Date);

        var sessionDtos = await sessionsQuery
            .OrderBy(s => s.StartTime)
            .Select(s => s.ToDto())
            .ToListAsync(cancellationToken);

        return new GetSessionsResult(sessionDtos);
    }
}