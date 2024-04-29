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

internal sealed class EditEventCommandHandler : IRequestHandler<EditEventCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IEventsSearchService _searchService;

    public EditEventCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IEventsSearchService searchService)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _searchService = searchService;
    }

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
            @event.Attendees.Count);

        await _searchService.IndexAsync(document, cancellationToken);
    }

    private static void UpdateEventWithCommand(Event @event, EditEventCommand request)
    {
        @event.Name = request.Name;
        @event.Venue = request.Venue switch
        {
            OnlineEventVenueDto online => new OnlineEventVenue { Url = online.Url },
            OfflineEventVenueDto offline => new OfflineEventVenue { Location = offline.Location },
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
