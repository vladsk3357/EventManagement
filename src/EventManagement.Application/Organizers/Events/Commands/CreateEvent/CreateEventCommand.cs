using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.CreateEvent;

[Authorize]
public sealed record CreateEventCommand(
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    AttendanceDto Attendance,
    EventVenueDto Venue,
    int CommunityId) : IRequest<CreateEventResultDto>;

internal sealed class CreateEventCommandHandler 
    : IRequestHandler<CreateEventCommand, CreateEventResultDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IEventsSearchService _searchService;

    public CreateEventCommandHandler(
        IApplicationDbContext dbContext,
        ICurrentUserAccessor currentUserAccessor,
        IEventsSearchService searchService)
    {
        _context = dbContext;
        _currentUserAccessor = currentUserAccessor;
        _searchService = searchService;
    }

    public async Task<CreateEventResultDto> Handle(CreateEventCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId;
        var community = await _context.Communities
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId && c.OrganizerId == userId, cancellationToken) 
            ?? throw new ValidationException();

        var entity = request.ToEntity();
        entity.OrganizerId = userId;

        await _context.Events.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        await _context.Attendees.AddAsync(new Attendee
        {
            EventId = entity.Id,
            UserId = userId,
            Status = AttendeeStatus.Confirmed,
        }, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var document = new EventIndexDocument(
            entity.Id,
            entity.Name,
            entity.Description,
            community.Id,
            entity.StartDate,
            entity.EndDate,
            1,
            entity.Venue switch
            {
                OfflineEventVenue offline => offline.Address.City,
                OnlineEventVenue => "онлайн",
                _ => throw new ArgumentException("Event type is not handled."),
            });

        await _searchService.IndexAsync(document, cancellationToken);

        return new CreateEventResultDto(entity.Id);
    }
}

