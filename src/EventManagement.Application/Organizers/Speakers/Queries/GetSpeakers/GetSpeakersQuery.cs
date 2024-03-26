using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;

public sealed record GetSpeakersQuery(int EventId) : IRequest<GetSpeakersResult>;

internal sealed class GetSpeakersQueryHandler : IRequestHandler<GetSpeakersQuery, GetSpeakersResult>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetSpeakersQueryHandler(IApplicationDbContext context, ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<GetSpeakersResult> Handle(GetSpeakersQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId!;

        var @event = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.EventId);

        var speakers = await _context.Speakers.Where(s => s.EventId == request.EventId)
            .ToListAsync(cancellationToken);

        var dtos = speakers
            .Select(s => s.ToDto())
            .ToList();

        return new GetSpeakersResult(dtos);
    }
}
