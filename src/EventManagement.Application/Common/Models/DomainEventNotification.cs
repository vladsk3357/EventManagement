using EventManagement.Domain.Common;
using MediatR;

namespace EventManagement.Application.Common.Models;

public class DomainEventNotification<TDomainEvent>(TDomainEvent domainEvent) 
    : INotification where TDomainEvent : DomainEvent
{
    public TDomainEvent DomainEvent { get; } = domainEvent;
}
