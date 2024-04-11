using System.Text.Json.Serialization;

namespace EventManagement.Domain.Entities.CommunityEvent;

[JsonDerivedType(typeof(OnlineEventVenue), typeDiscriminator: EventVenueTypes.Online)]
[JsonDerivedType(typeof(OfflineEventVenue), typeDiscriminator: EventVenueTypes.Offline)]
public abstract class EventVenueBase
{
    public abstract string Type { get; }
}
