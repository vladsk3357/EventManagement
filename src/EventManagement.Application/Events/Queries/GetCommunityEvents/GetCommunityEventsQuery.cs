using EventManagement.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetCommunityEvents;

public sealed record GetCommunityEventsQuery(int CommunityId) : IRequest<List<GetCommunityEventsEventDto>>;

internal sealed class GetCommunityEventsQueryHandler : IRequestHandler<GetCommunityEventsQuery, List<GetCommunityEventsEventDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public GetCommunityEventsQueryHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<List<GetCommunityEventsEventDto>> Handle(GetCommunityEventsQuery request, CancellationToken cancellationToken)
    {
        var events = await _context.Events
            .Where(e => e.CommunityId == request.CommunityId)
            .ToListAsync(cancellationToken);

        var now = _dateTime.Now;

        return events.Select(e => new GetCommunityEventsEventDto
        (
            e.Id,
            e.Name,
            e.EndDate < now
        )).ToList();
    }
}
