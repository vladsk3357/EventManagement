using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.MailTemplateModels;
using EventManagement.Domain.Entities.Community;
using EventManagement.Infrastructure.Mail.Options;
using EventManagement.Infrastructure.Services;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Mail.Services;

internal class MailService(IOptions<MailOptions> options, FrontendUrlService frontendUrlService) 
    : MailServiceCore(options), IMailService
{
    private readonly FrontendUrlService _frontendUrlService = frontendUrlService;

    public async Task SendEmailConfirmationMailAsync(string to, EmailConfirmationMailTemplateModel model, CancellationToken cancellation = default!)
    {
        ArgumentException.ThrowIfNullOrEmpty(to);

        await SendEmailAsync([to], "Підтвердження пошти", MailTemplateNames.EmailConfirmation, model, cancellation);
    }

    public async Task SendResetPasswordMailAsync(string to, ResetPasswordMailTemplateModel model, CancellationToken cancellation = default!)
    {
        ArgumentException.ThrowIfNullOrEmpty(to);

        await SendEmailAsync([to], "Скинути пароль", MailTemplateNames.ResetPassword, model, cancellation);
    }

    public async Task SendCommunicationEmailAsync(string to, string subject, string message, Community community, CancellationToken cancellation = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(to);

        var model = new CommunicationMailTemplateModel(message, community.Name);
        await SendEmailAsync(
            [to], 
            FormatCommunicationEmailSubject(subject, community.Name), 
            MailTemplateNames.Communication, model, cancellation);
    }

    private static string FormatCommunicationEmailSubject(string subject, string fromName)
    {
        return $"{fromName}: \"{subject}\"";
    }

    public async Task SendInvitationToCommunityMailAsync(string to, Community community, CancellationToken cancellation = default!)
    {
        ArgumentException.ThrowIfNullOrEmpty(to);

        var model = new InvitationToCommunityMailTemplateModel(community.Name, _frontendUrlService.GetUrl() + "/community/" + community.Id);
        await SendEmailAsync([to], $"Тебе запросили приєднатися до {model.CommunityName}", MailTemplateNames.InvitationToCommunity, model, cancellation);
    }

    public async Task SendEventCancelledMailAsync(string to, EventCancelledMailTemplateModel model, CancellationToken cancellation = default!)
    {
        ArgumentException.ThrowIfNullOrEmpty(to);

        await SendEmailAsync([to], $"Подію {model.EventName} скасовано", MailTemplateNames.EventCancelled, model, cancellation);
    }
}
