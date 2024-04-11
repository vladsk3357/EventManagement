using EventManagement.Domain.Entities.CommunityEvent;

namespace EventManagement.Domain.Entities;

public class Session : AuditableEntity
{
    public int Id { get; set; }

    public string Title { get; set; } = default!;

    public DateTime StartTime { get; set; }

    public TimeSpan Duration { get; set; }

    public DateTime EndTime => StartTime + Duration;

    public string Description { get; set; } = default!;

    public int EventId { get; set; } = default!;

    public Event Event { get; set; } = default!;

    public ICollection<Speaker> Speakers { get; set; } = [];
}
