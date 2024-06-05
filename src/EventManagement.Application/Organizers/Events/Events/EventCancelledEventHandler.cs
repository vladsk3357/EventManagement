using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.MailTemplateModels;
using EventManagement.Application.Common.Models;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Events;

internal sealed class EventCancelledEventHandler(
    IApplicationDbContext applicationDbContext, 
    IUserService userService,
    IMailService mailService)
      : INotificationHandler<DomainEventNotification<EventCancelledEvent>>
{
    private readonly IApplicationDbContext _applicationDbContext = applicationDbContext;
    private readonly IUserService _userService = userService;
    private readonly IMailService _mailService = mailService;

    public async Task Handle(
        DomainEventNotification<EventCancelledEvent> notification, 
        CancellationToken cancellationToken)
    {
        var eventId = notification.DomainEvent.EventId;
        var attendees = await _applicationDbContext.Attendees
            .Where(a => a.EventId == eventId && (
                a.Status == AttendeeStatus.Pending
                || a.Status == AttendeeStatus.Confirmed))
            .ToListAsync(cancellationToken);

        var @event = await _applicationDbContext.Events
            .Include(e => e.Community)
            .SingleAsync(e => e.Id == eventId, cancellationToken);

        var attendeesIds = attendees.Select(a => a.UserId).ToList();
        var users = await _userService.GetUsersByIdListAsync(attendeesIds, cancellationToken);

        var tasks = users.Select(u => _mailService.SendEventCancelledMailAsync(
            u.Email, 
            new EventCancelledMailTemplateModel(@event.Community.Name, @event.Name), 
            cancellationToken)).ToList();

        await Task.WhenAll(tasks);
    }
}
