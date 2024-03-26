namespace EventManagement.Application.Organizers.Events.Queries.GetEvents;

public sealed record GetEventsEventDto(
    int Id,
    string Name,
    string Location,
    DateTime StartDate,
    int AttendeesCount);
