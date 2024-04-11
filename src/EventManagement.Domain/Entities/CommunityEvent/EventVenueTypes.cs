namespace EventManagement.Domain.Entities.CommunityEvent;

public static class EventVenueTypes
{
    public const string Online = "Online";
    public const string Offline = "Offline";
    public static readonly IReadOnlySet<string> Types = new HashSet<string>() { Online, Offline };
}
