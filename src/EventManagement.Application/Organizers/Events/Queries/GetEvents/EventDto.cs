using EventManagement.Application.Common.Models.Event;

namespace EventManagement.Application.Organizers.Events.Queries.GetEvents;

public sealed record EventDto(
    int Id,
    string Name,
    EventVenueDto Venue,
    DateTime StartDate,
    int AttendeesCount);
