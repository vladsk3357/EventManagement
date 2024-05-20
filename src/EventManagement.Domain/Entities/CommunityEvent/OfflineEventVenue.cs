using EventManagement.Domain.ValueObjects;

namespace EventManagement.Domain.Entities.CommunityEvent;

public class OfflineEventVenue : EventVenueBase
{
    public override string Type => EventVenueTypes.Offline;

    public Address Address { get; set; } = null!;
}
