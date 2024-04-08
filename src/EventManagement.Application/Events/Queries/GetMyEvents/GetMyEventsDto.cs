using EventManagement.Application.Common.Models.Event;

namespace EventManagement.Application.Events.Queries.GetMyEvents;

public sealed record GetMyEventsDto(
    DateTime Date,
    IEnumerable<EventDto> Events);

public sealed record EventDto(
    int Id,
    string Name,
    DateTime StartDate,
    EventVenueDto Venue,
    int AttendeesCount,
    CommunityDto Community,
    bool IsPast);

public sealed record CommunityDto(int Id, string Name);