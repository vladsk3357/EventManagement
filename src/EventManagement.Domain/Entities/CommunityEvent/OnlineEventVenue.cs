namespace EventManagement.Domain.Entities.CommunityEvent;

public class OnlineEventVenue : EventVenueBase
{
    public override string Type => EventVenueTypes.Online;

    public string Url { get; set; } = null!;
}
