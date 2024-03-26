using EventManagement.Domain.Entities;

namespace EventManagement.Application.Events.Queries.GetAttendees;

internal static class GetAttendeesMapper
{
    public static AttendeeDto ToDto(this User user) => new(user.Id, user.Name);
}
