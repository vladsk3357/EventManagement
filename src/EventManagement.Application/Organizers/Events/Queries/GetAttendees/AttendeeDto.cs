namespace EventManagement.Application.Organizers.Events.Queries.GetAttendees;

public sealed record AttendeeDto(
    int Id, 
    string UserId,
    string UserName,
    string Name,
    DateTime JoinDate);
