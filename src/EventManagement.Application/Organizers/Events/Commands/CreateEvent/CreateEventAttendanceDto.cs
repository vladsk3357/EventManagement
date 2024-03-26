namespace EventManagement.Application.Organizers.Events.Commands.CreateEvent;

public sealed record CreateEventAttendanceDto(int? Limit, bool ShouldBeApproved);
