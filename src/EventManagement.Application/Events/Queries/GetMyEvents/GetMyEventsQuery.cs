using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetMyEvents;

public sealed record GetMyEventsQuery(bool IsPast) : IRequest<NonPagedList<GetMyEventsDto>>;

internal sealed class GetMyEventsQueryHandler : IRequestHandler<GetMyEventsQuery, NonPagedList<GetMyEventsDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IDateTime _dateTime;

    public GetMyEventsQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IDateTime dateTime)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _dateTime = dateTime;
    }

    public async Task<NonPagedList<GetMyEventsDto>> Handle(GetMyEventsQuery request, CancellationToken cancellationToken)
    {
        var now = _dateTime.Now;
        var eventsQuery = _context.Attendees.Where(a => a.UserId == _currentUserAccessor.UserId)
            .Include(a => a.Event)
            .Include(a => a.Event.Community)
            .Include(a => a.Event.Attendees)
            .Select(a => a.Event);

        eventsQuery = request.IsPast ? eventsQuery.Where(e => e.StartDate < now) : eventsQuery.Where(e => e.StartDate >= now);

        var events = await eventsQuery
            .OrderBy(e => e.StartDate)
            .GroupBy(e => e.StartDate.Date)
            .Select(e => new GetMyEventsDto(
                e.Key,
                e.Select(e => new EventDto(
                    e.Id,
                    e.Name,
                    e.StartDate,
                    e.Venue.ToDto(),
                    e.Attendees.Count,
                    new CommunityDto(e.Community.Id, e.Community.Name),
                    e.StartDate < now))))
            .ToListAsync(cancellationToken);

        return new NonPagedList<GetMyEventsDto>(events);
    }
}
