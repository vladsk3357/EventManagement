namespace EventManagement.Domain.Entities;

public class Event : AuditableEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;

    public string Description { get; set; } = default!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string Location { get; set; } = default!;

    public int CommunityId { get; set; } = default!;

    public Community Community { get; set; } = default!;

    public string OrganizerId { get; set; } = default!;

    public EventAttendance Attendance { get; set; } = default!;

    public ICollection<Attendee> Attendees { get; set; }
}
