﻿using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models;
using EventManagement.Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;

namespace EventManagement.Infrastructure.Services;

internal class DomainEventService : IDomainEventService
{
    private readonly ILogger<DomainEventService> _logger;
    private readonly IPublisher _publisher;

    public DomainEventService(ILogger<DomainEventService> logger, IPublisher publisher)
    {
        _logger = logger;
        _publisher = publisher;
    }

    public async Task Publish(DomainEvent domainEvent)
    {
        _logger.LogInformation("Publishing domain event. Event - {event}", domainEvent.GetType().Name);
        await _publisher.Publish(GetNotificationCorrespondingToDomainEvent(domainEvent));
    }

    private static INotification GetNotificationCorrespondingToDomainEvent(DomainEvent domainEvent)
    {
        return (INotification)Activator.CreateInstance(
            typeof(DomainEventNotification<>).MakeGenericType(domainEvent.GetType()), domainEvent)!;
    }
}
