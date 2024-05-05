namespace EventManagement.Domain.Entities.CommunityEvent;

public class EventImage
{
    public int Id { get; set; }

    public string FileName { get; set; } = default!;

    public int EventId { get; set; }

    public Event Event { get; set; } = default!;
}
