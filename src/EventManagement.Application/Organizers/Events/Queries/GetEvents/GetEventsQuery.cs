using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Queries.GetEvents;

[Authorize]
public sealed record GetEventsQuery(
    int CommunityId,
    string? SearchTerm,
    bool IsPast,
    int Page,
    int PageSize) : PagedRequest(Page, PageSize), IRequest<PagedList<EventDto>>;

internal sealed class GetEventsQueryHandler : IRequestHandler<GetEventsQuery, PagedList<EventDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IDateTime _dateTime;

    public GetEventsQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IDateTime dateTime)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _dateTime = dateTime;
    }

    public async Task<PagedList<EventDto>> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities.FirstOrDefaultAsync(
            c => c.Id == request.CommunityId && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(request.CommunityId), request.CommunityId);

        var eventsQuery = _context.Events.Include(e => e.Attendees)
            .Where(e => e.CommunityId == request.CommunityId);

        eventsQuery = request.IsPast
            ? eventsQuery.Where(e => e.EndDate < _dateTime.Now).OrderByDescending(e => e.StartDate)
            : eventsQuery.Where(e => e.EndDate >= _dateTime.Now).OrderBy(e => e.StartDate);

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            eventsQuery = eventsQuery.Where(e => e.Name.Contains(request.SearchTerm));

        var eventsDtosQuery = eventsQuery
            .Select(e => new { Event = e, AttendeesCount = e.Attendees.Count() })
            .Select(e => new EventDto(
                e.Event.Id, 
                e.Event.Name,
                e.Event.Venue.ToDto(), 
                e.Event.StartDate, 
                e.AttendeesCount));

        return await PagedList<EventDto>.CreateAsync(eventsDtosQuery, request.Page, request.PageSize);
    }
}
