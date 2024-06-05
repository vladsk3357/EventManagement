using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.ValueObjects;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.EditEvent;

[Authorize]
public sealed record EditEventCommand(
    int Id,
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    AttendanceDto Attendance,
    EventVenueDto Venue,
    int CommunityId) : IRequest;

internal sealed class EditEventCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    IEventsSearchService searchService) : IRequestHandler<EditEventCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IEventsSearchService _searchService = searchService;

    public async Task Handle(EditEventCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .Include(e => e.Attendees)
            .FirstOrDefaultAsync(e => e.Id == request.Id && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.Id), "Події не існує.");

        UpdateEventWithCommand(@event, request);
        await _context.SaveChangesAsync(cancellationToken);

        var document = new EventIndexDocument(
            @event.Id,
            @event.Name,
            @event.Description,
            @event.CommunityId,
            @event.StartDate,
            @event.EndDate,
            @event.Attendees.Count,
            @event.Venue switch
            {
                OfflineEventVenue offline => offline.Address.City,
                OnlineEventVenue => "онлайн",
                _ => throw new ArgumentException("Event type is not handled."),
            });

        await _searchService.IndexAsync(document, cancellationToken);
    }

    private static void UpdateEventWithCommand(Event @event, EditEventCommand request)
    {
        @event.Name = request.Name;
        @event.Venue = request.Venue switch
        {
            OnlineEventVenueDto online => new OnlineEventVenue { Url = online.Url },
            OfflineEventVenueDto offline => new OfflineEventVenue 
            {
                Address = new Address(
                    offline.Address.City, 
                    offline.Address.Street, 
                    offline.Address.LocationName, 
                    offline.Address.ZipCode)
            },
            _ => throw new NotImplementedException(),
        };
        @event.Description = request.Description;
        @event.StartDate = request.StartDate;
        @event.EndDate = request.EndDate;
        @event.CommunityId = request.CommunityId;
        @event.Attendance = new EventAttendance
        {
            Limit = request.Attendance.Limit,
            ShouldBeApproved = request.Attendance.ShouldBeApproved,
        };
    }
}
