using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetCommunityEvents;

public sealed record GetCommunityEventsQuery(int CommunityId, bool? Past, int Page, int PageSize) : IRequest<PagedList<GetCommunityEventsEventDto>>;

internal sealed class GetCommunityEventsQueryHandler : IRequestHandler<GetCommunityEventsQuery, PagedList<GetCommunityEventsEventDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public GetCommunityEventsQueryHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<PagedList<GetCommunityEventsEventDto>> Handle(GetCommunityEventsQuery request, CancellationToken cancellationToken)
    {
        var now = _dateTime.Now;
        var query = _context.Events
            .Include(e => e.Attendees)
            .Where(e => e.CommunityId == request.CommunityId);

        if (request.Past.HasValue)
        {
            query = request.Past.Value
                ? query.Where(e => e.StartDate < now)
                : query.Where(e => e.StartDate >= now);
        }

        var dtos = query.OrderBy(e => e.StartDate)
            .Select(e => new GetCommunityEventsEventDto(
             e.Id,
             e.Name,
             e.Attendees.Count,
             e.StartDate,
             ((OnlineEventVenue)e.Venue).Url));

        return await PagedList<GetCommunityEventsEventDto>.CreateAsync(dtos, request.Page, request.PageSize);
    }
}
