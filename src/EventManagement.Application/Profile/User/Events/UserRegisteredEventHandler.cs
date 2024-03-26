using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.MailTemplateModels;
using EventManagement.Application.Common.Models;
using EventManagement.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace EventManagement.Application.Profile.User.Events;

internal sealed class UserRegisteredEventHandler
    : INotificationHandler<DomainEventNotification<UserRegisteredEvent>>
{
    private readonly ILogger<UserRegisteredEventHandler> _logger;
    private readonly IMailService _mailService;
    private readonly ILinksService _linksService;
    private readonly IIdentityService _identityService;

    public UserRegisteredEventHandler(
        ILogger<UserRegisteredEventHandler> logger,
        IMailService mailService,
        ILinksService linksService,
        IIdentityService identityService)
    {
        _logger = logger;
        _mailService = mailService;
        _linksService = linksService;
        _identityService = identityService;
    }

    public async Task Handle(DomainEventNotification<UserRegisteredEvent> notification, CancellationToken cancellationToken)
    {
        var domainEvent = notification.DomainEvent;

        _logger.LogInformation("Handling domain event. Event - {event}", domainEvent.GetType().Name);
        await SendEmailConfirmationMailAsync(domainEvent.User, cancellationToken);

        return;
    }

    private async Task SendEmailConfirmationMailAsync(Domain.Entities.User user, CancellationToken cancellationToken = default!)
    {
        var email = user.Email;
        var name = user.Name;

        var token = await _identityService.GenerateEmailConfirmationToken(email, cancellationToken);
        if (token is null)
            return;

        var emailConfirmationLink = _linksService.GenerateEmailConfirmationLink(token, email);

        var emailTemplateModel = new EmailConfirmationMailTemplateModel(name, emailConfirmationLink);
        await _mailService.SendEmailConfirmationMailAsync(email, emailTemplateModel, cancellationToken);
    }
}
