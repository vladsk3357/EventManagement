namespace EventManagement.Domain.Events;

public class EventCancelledEvent(int eventId): DomainEvent
{
    public int EventId { get; } = eventId;
}
