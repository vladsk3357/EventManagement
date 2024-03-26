namespace EventManagement.Domain.Entities;

public class Attendee : AuditableEntity
{
    public int Id { get; set; }

    public string UserId { get; set; } = default!;

    public int EventId { get; set; } = default!;

    public Event Event { get; set; } = default!;

    public AttendeeStatus Status { get; set; }
}

public enum AttendeeStatus
{
    Pending = 0,
    Confirmed = 1,
    Cancelled = 2
}
