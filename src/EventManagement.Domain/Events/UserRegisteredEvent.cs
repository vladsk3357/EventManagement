using EventManagement.Domain.Entities;

namespace EventManagement.Domain.Events;

public class UserRegisteredEvent : DomainEvent
{
    public UserRegisteredEvent(User user) => User = user;

    public User User { get; }
}
