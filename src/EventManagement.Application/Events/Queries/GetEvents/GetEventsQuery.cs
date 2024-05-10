using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetEvents;

[Authorize]
public sealed record GetEventsQuery(
    string? SortBy,
    string? SortOrder,
    int Page,
    int PageSize,
    DateTime? StartDate,
    DateTime? EndDate,
    string[]? Location) : PagedRequest(Page, PageSize), IRequest<PagedList<EventDto>>;

internal sealed class GetEventsQueryHandler(
    IApplicationDbContext context,
    IEventsSearchService eventsSearchService,
    IDateTime dateTime) : IRequestHandler<GetEventsQuery, PagedList<EventDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IEventsSearchService _eventsSearchService = eventsSearchService;
    private readonly IDateTime _dateTime = dateTime;

    public async Task<PagedList<EventDto>> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        var searchRequest = new SearchRequest<EventIndexDocument>
        {
            Page = request.Page - 1,
            PageSize = request.PageSize,
            SortBy = request.SortBy,
            IsSortAscending = request.SortOrder == "asc",
        };

        searchRequest.Filters.Add(new RangeFilter<EventIndexDocument>(e => e.StartDate, request.StartDate ?? _dateTime.Now, request.EndDate));

        if (request.Location is not null)
        {
            searchRequest.Filters.Add(new TextFilter<EventIndexDocument>(c => c.Location, request.Location));
        }

        var result = await _eventsSearchService.SearchAsync(searchRequest, cancellationToken);
        var events = await _context.Events
            .Include(e => e.Attendees)
            .Include(e => e.Community)
            .Where(e => result.Results.Select(r => r.Id).Contains(e.Id))
            .ToDictionaryAsync(e => e.Id, cancellationToken);

        return new PagedList<EventDto>(
            result.Results.Select(e => new EventDto(
                e.Id,
                e.Name,
                new CommunityDto(e.CommunityId, events[e.Id].Community.Name),
                e.StartDate,
                events[e.Id].Attendees.Count,
                events[e.Id].Venue.ToDto(),
                events[e.Id].IsCancelled)).ToList(),
            result.Page,
            result.PageSize,
            result.Total);
    }
}
