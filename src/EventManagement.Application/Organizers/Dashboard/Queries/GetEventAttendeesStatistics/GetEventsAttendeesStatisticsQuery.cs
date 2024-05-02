using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.Community;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Dashboard.Queries.GetEventAttendeesStatistics;

[Authorize]
public sealed record GetEventsAttendeesStatisticsQuery(int CommunityId) : IRequest<EventsAttendeesStatisticsDto>;

public sealed record EventsAttendeesStatisticsDto(int Count, int PreviousCount, string Dynamic);

internal sealed class GetEventsAttendeesStatisticsQueryHandler : IRequestHandler<GetEventsAttendeesStatisticsQuery, EventsAttendeesStatisticsDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IDateTime _dateTime;

    public GetEventsAttendeesStatisticsQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IDateTime dateTime)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _dateTime = dateTime;
    }

    public async Task<EventsAttendeesStatisticsDto> Handle(GetEventsAttendeesStatisticsQuery request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId 
            && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.CommunityId);

        var attendeesQuery = _context.Attendees.Include(a => a.Event)
            .Where(a => a.Event.CommunityId == community.Id);
        
        var now = _dateTime.Now;
        var currentStartDate = now.AddMonths(-1);
        var previousStartDate = now.AddMonths(-2);

        var count = await attendeesQuery
            .CountAsync(a => a.Created > currentStartDate, cancellationToken);
        var previousCount = await attendeesQuery
            .CountAsync(a => a.Created > previousStartDate && a.Created <= currentStartDate, cancellationToken);

        return new EventsAttendeesStatisticsDto(
            count, 
            previousCount, 
            StatisticsDynamic.GetDynamic(count - previousCount));
    }
}
