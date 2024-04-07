using EventManagement.Domain.Entities.CommunityEvent;

namespace EventManagement.Application.Common.Models.Event;

internal static class EventVenueDtoMapper
{
    public static EventVenueDto ToDto(this EventVenueBase venue)
        => venue switch
        {
            OnlineEventVenue onlineVenue => new OnlineEventVenueDto(EventVenueTypes.Online, onlineVenue.Url),
            OfflineEventVenue offlineVenue => new OfflineEventVenueDto(EventVenueTypes.Offline, offlineVenue.Location),
            _ => throw new NotSupportedException(),
        };
}
