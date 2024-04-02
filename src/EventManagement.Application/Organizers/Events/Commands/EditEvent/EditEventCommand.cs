using System;
using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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

    public EditEventCommandHandler(
        IApplicationDbContext context, 
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(EditEventCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == request.Id && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.Id), "Події не існує.");

        UpdateEventWithCommand(@event, request);
        await _context.SaveChangesAsync(cancellationToken);
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
