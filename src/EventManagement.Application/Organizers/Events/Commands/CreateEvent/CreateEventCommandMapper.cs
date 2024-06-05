using EventManagement.Application.Common.Models.Event;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.ValueObjects;

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
            OfflineEventVenueDto offline => new OfflineEventVenue { Address = offline.Address.ToEntity() },
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

    private static Address ToEntity(this AddressDto address) 
        => new(
            address.City, 
            address.Street, 
            address.LocationName, 
            address.ZipCode);
}
