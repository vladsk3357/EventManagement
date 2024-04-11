namespace EventManagement.Application.Organizers.Events.Commands.EditEvent;

public sealed record EditEventAttendanceDto(int? Limit, bool ShouldBeApproved);