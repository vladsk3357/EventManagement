using EventManagement.Domain.Common;

namespace EventManagement.Application.Common.Interfaces;

public interface IDomainEventService
{
    Task Publish(DomainEvent domainEvent);
}
