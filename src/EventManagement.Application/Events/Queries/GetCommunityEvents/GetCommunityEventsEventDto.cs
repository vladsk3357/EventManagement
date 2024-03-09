namespace EventManagement.Application.Events.Queries.GetCommunityEvents;

public sealed record GetCommunityEventsEventDto(
    int Id,
    string Name,
    bool IsCurrent);
