using EventManagement.Domain.Entities.CommunityEvent;

namespace EventManagement.Domain.Entities.Form;

public class EventAttendanceForm
{
    public int Id { get; set; }

    public int EventId { get; set; }

    public Event Event { get; set; } = null!;

    public int FormId { get; set; }

    public Form Form { get; set; } = null!;
}
