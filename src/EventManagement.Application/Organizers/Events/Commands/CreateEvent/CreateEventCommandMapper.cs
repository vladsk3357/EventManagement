namespace EventManagement.Application.Organizers.Events.Commands.CreateEvent;

internal static class CreateEventCommandMapper
{
    public static Domain.Entities.Event ToEntity(this CreateEventCommand command) => new()
    {
        Name = command.Name,
        Description = command.Description,
        Location = command.Location.VenueType switch
        {
            "online" => command.Location.Url!,
            "offline" => command.Location.Location!,
            _ => throw new NotImplementedException(),
        },
        StartDate = command.StartDate,
        EndDate = command.EndDate,
        CommunityId = command.CommunityId,
        Attendance = new()
        {
            Limit = command.Attendance.Limit,
            ShouldBeApproved = command.Attendance.ShouldBeApproved,
        },
    };
}
