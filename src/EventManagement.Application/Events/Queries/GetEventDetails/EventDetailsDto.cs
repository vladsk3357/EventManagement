namespace EventManagement.Application.Events.Queries.GetEventDetails;

public sealed record EventDetailsDto(
    int Id,
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    string Location);
