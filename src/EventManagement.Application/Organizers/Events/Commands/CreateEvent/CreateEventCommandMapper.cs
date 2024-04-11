using EventManagement.Application.Common.Models.Event;
using EventManagement.Domain.Entities.CommunityEvent;

namespace EventManagement.Application.Organizers.Events.Commands.CreateEvent;

internal static class CreateEventCommandMapper
{
    public static Event ToEntity(this CreateEventCommand command) => new()
    {
        Name = command.Name,
        Description = command.Description,
        Venue = command.Venue switch
        {
            OnlineEventVenueDto online => new OnlineEventVenue { Url = online.Url },
            OfflineEventVenueDto offline => new OfflineEventVenue { Location = offline.Location },
            _ => throw new NotImplementedException(),
        },
        StartDate = command.StartDate,
        EndDate = command.EndDate,
        CommunityId = command.CommunityId,
        Attendance = new()
        {
            Limit = command.Attendance.Limit,
            ShouldBeApproved = command.Attendance.ShouldBeApproved,
        },
    };
}
