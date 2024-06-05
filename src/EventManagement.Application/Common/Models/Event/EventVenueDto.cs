namespace EventManagement.Application.Common.Models.Event;

public abstract record EventVenueDto(string Type);

public sealed record OnlineEventVenueDto(string Type, string Url)
    : EventVenueDto(Type);

public sealed record OfflineEventVenueDto(string Type, AddressDto Address)
    : EventVenueDto(Type);

public sealed record AddressDto(
    string City, 
    string Street, 
    string LocationName, 
    string? ZipCode = null);