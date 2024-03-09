using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetEventDetails;

public sealed record GetEventDetailsQuery(int Id) : IRequest<EventDetailsDto>;

internal sealed class GetEventDetailsQueryHandler : IRequestHandler<GetEventDetailsQuery, EventDetailsDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public GetEventDetailsQueryHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<EventDetailsDto> Handle(GetEventDetailsQuery request, CancellationToken cancellationToken)
    {
        var communityEvent = await _context.Events.FindAsync(new object?[] { request.Id }, cancellationToken);

        if (communityEvent is null)
            throw new NotFoundException(nameof(Event), request.Id);

        var dto = new EventDetailsDto(
            Id: communityEvent.Id!,
            Name: communityEvent.Name,
            Description: communityEvent.Description,
            StartDate: communityEvent.StartDate,
            EndDate: communityEvent.EndDate,
            Location: communityEvent.Location);

        return dto;
    }
}
