using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetMyEvents;

public sealed record GetMyEventsQuery(bool IsPast) : IRequest<NonPagedList<GetMyEventsDto>>;

internal sealed class GetMyEventsQueryHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    IDateTime dateTime) : IRequestHandler<GetMyEventsQuery, NonPagedList<GetMyEventsDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IDateTime _dateTime = dateTime;

    public async Task<NonPagedList<GetMyEventsDto>> Handle(GetMyEventsQuery request, CancellationToken cancellationToken)
    {
        var now = _dateTime.Now;
        var eventsQuery = _context.Attendees.Where(a => a.UserId == _currentUserAccessor.UserId)
            .Include(a => a.Event)
            .Include(a => a.Event.Community)
            .Include(a => a.Event.Attendees)
            .Select(a => a.Event);

        var groupedEventsQuery = request.IsPast 
            ? eventsQuery.Where(e => e.StartDate < now)
                .GroupBy(e => e.StartDate.Date)
                .OrderByDescending(e => e.Key)
            : eventsQuery.Where(e => e.StartDate >= now)
                .GroupBy(e => e.StartDate.Date)
                .OrderBy(e => e.Key);

        var events = await groupedEventsQuery
            .Select(e => new GetMyEventsDto(
                e.Key,
                e.Select(e => new EventDto(
                    e.Id,
                    e.Name,
                    e.StartDate,
                    e.Venue.ToDto(),
                    e.Attendees.Count,
                    new CommunityDto(e.Community.Id, e.Community.Name),
                    e.StartDate < now,
                    e.IsCancelled))))
            .ToListAsync(cancellationToken);

        return new NonPagedList<GetMyEventsDto>(events);
    }
}
