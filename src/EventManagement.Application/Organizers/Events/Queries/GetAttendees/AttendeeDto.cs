namespace EventManagement.Application.Organizers.Events.Queries.GetAttendees;

public sealed record AttendeeDto(
    int Id, 
    string UserName,
    string Name,
    DateTime Date);
