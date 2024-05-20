using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetCommunityEvents;

public sealed record GetCommunityEventsQuery(
    int CommunityId,
    bool IsPast,
    int Page,
    int PageSize) : IRequest<PagedList<GetCommunityEventsEventDto>>;

internal sealed class GetCommunityEventsQueryHandler(
    IApplicationDbContext context,
    IDateTime dateTime)
    : IRequestHandler<GetCommunityEventsQuery, PagedList<GetCommunityEventsEventDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IDateTime _dateTime = dateTime;

    public async Task<PagedList<GetCommunityEventsEventDto>> Handle(GetCommunityEventsQuery request, CancellationToken cancellationToken)
    {
        var now = _dateTime.Now;
        var query = _context.Events
            .Include(e => e.Attendees)
            .Where(e => e.CommunityId == request.CommunityId);

        query = request.IsPast
            ? query.Where(e => e.StartDate < now)
                .OrderByDescending(e => e.StartDate)
            : query.Where(e => e.StartDate >= now)
                .OrderBy(e => e.StartDate);

        var dtos = query.Select(e => new GetCommunityEventsEventDto(
             e.Id,
             e.Name,
             e.Attendees.Count,
             e.StartDate,
             e.Venue.ToDto(),
             e.IsCancelled));

        return await PagedList<GetCommunityEventsEventDto>.CreateAsync(dtos, request.Page, request.PageSize);
    }
}
