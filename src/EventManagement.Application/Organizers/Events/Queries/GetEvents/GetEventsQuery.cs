using System.Linq.Expressions;
using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Queries.GetEvents;

[Authorize]
public sealed record GetEventsQuery(
    int CommunityId,
    string? SearchTerm,
    string? SortBy,
    string? SortOrder,
    int Page,
    int PageSize) : PagedRequest(Page, PageSize), IRequest<PagedList<GetEventsEventDto>>;

internal sealed class GetEventsQueryHandler : IRequestHandler<GetEventsQuery, PagedList<GetEventsEventDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetEventsQueryHandler(
        IApplicationDbContext context, 
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<PagedList<GetEventsEventDto>> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities.FirstOrDefaultAsync(
            c => c.Id == request.CommunityId && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(request.CommunityId), request.CommunityId);

        var eventsQuery = _context.Events.Where(e => e.CommunityId == request.CommunityId);

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            eventsQuery = eventsQuery.Where(e => e.Name.Contains(request.SearchTerm));

        eventsQuery = request.SortOrder?.ToLower() == "desc"
            ? eventsQuery.OrderByDescending(GetSortProperty(request))
            : eventsQuery.OrderBy(GetSortProperty(request));

        var eventsDtosQuery = eventsQuery.Include(e => e.Attendees)
            .Select(e => new { Event = e, AttendeesCount = e.Attendees.Count() })
            .Select(e => new GetEventsEventDto(e.Event.Id, e.Event.Name, ((OnlineEventVenue)e.Event.Venue).Url, e.Event.StartDate, e.AttendeesCount));

        return await PagedList<GetEventsEventDto>.CreateAsync(eventsDtosQuery, request.Page, request.PageSize);
    }

    private static Expression<Func<Event, object>> GetSortProperty(GetEventsQuery request)
        => request.SortBy?.ToLower() switch
        {
            "name" => c => c.Name,
            "startdate" => c => c.StartDate,
            _ => c => c.Id
        };
}
