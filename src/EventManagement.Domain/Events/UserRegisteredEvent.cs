using EventManagement.Domain.Entities;

namespace EventManagement.Domain.Events;

public class UserRegisteredEvent(User user) : DomainEvent
{
    public User User { get; } = user;
}
