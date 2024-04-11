namespace EventManagement.Domain.Entities.CommunityEvent;

public class OfflineEventVenue : EventVenueBase
{
    public override string Type => EventVenueTypes.Offline;

    public string Location { get; set; } = null!;
}
