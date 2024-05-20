using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.ValueObjects;

namespace EventManagement.Application.Common.Models.Event;

internal static class EventVenueDtoMapper
{
    public static EventVenueDto ToDto(this EventVenueBase venue)
        => venue switch
        {
            OnlineEventVenue onlineVenue => new OnlineEventVenueDto(EventVenueTypes.Online, onlineVenue.Url),
            OfflineEventVenue offlineVenue => new OfflineEventVenueDto(EventVenueTypes.Offline, offlineVenue.Address.ToDto()),
            _ => throw new NotSupportedException(),
        };

    private static AddressDto ToDto(this Address address)
        => new(
            address.City, 
            address.Street, 
            address.LocationName, 
            address.ZipCode);
}
