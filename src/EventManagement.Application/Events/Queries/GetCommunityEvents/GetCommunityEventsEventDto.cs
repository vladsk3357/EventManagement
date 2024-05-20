using EventManagement.Application.Common.Models.Event;

namespace EventManagement.Application.Events.Queries.GetCommunityEvents;

public sealed record GetCommunityEventsEventDto(
    int Id,
    string Name,
    int AttendeesCount,
    DateTime StartDate,
    EventVenueDto Venue,
    bool IsCancelled);
