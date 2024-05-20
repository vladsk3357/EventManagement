using EventManagement.Application.Common.Models.Event;

namespace EventManagement.Application.Events.Queries.GetEvents;

public sealed record EventDto(
    int Id,
    string Name,
    CommunityDto Community,
    DateTime StartDate,
    int AttendeesCount,
    EventVenueDto Venue,
    bool IsCancelled);

public sealed record CommunityDto(int Id, string Name);