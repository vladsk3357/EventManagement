namespace EventManagement.Application.Events.Queries.GetEventDetails;

public sealed record GetEventDetailsDto(
    int Id,
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    string Location,
    int AttendeesCount,
    bool IsAttendable,
    bool IsAttending,
    bool IsOrganizer,
    GetEventDetailsCommunityDto Community);
