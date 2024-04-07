namespace EventManagement.Application.Common.Models.Event;

public abstract record EventVenueDto(string Type);

public sealed record OnlineEventVenueDto(string Type, string Url)
    : EventVenueDto(Type);

public sealed record OfflineEventVenueDto(string Type, string Location)
    : EventVenueDto(Type);
