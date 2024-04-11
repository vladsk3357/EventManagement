namespace EventManagement.Application.Organizers.Events;

public sealed record AttendanceDto(int? Limit, bool ShouldBeApproved);
