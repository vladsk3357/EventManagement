namespace EventManagement.Domain.Entities;

public class EventAttendance
{
    public int? Limit { get; set; }

    public bool ShouldBeApproved { get; set; }

    public bool Limited => Limit is not null;
}
