using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.MailTemplateModels;
using EventManagement.Infrastructure.Mail.Options;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Mail.Services;

internal class MailService : MailServiceCore, IMailService
{
    public MailService(IOptions<MailOptions> options) : base(options)
    {
    }

    public async Task SendEmailConfirmationMailAsync(string to, EmailConfirmationMailTemplateModel model, CancellationToken cancellation = default!)
    {
        if (string.IsNullOrEmpty(to))
            throw new ArgumentException(null, nameof(to));

        await SendEmailAsync(new string[] { to }, "Email confirmation", MailTemplateName.EmailConfirmation, model, cancellation);
    }

    public async Task SendResetPasswordMailAsync(string to, ResetPasswordMailTemplateModel model, CancellationToken cancellation = default!)
    {
        if (string.IsNullOrEmpty(to))
            throw new ArgumentException(null, nameof(to));

        await SendEmailAsync(new string[] { to }, "Reset password", MailTemplateName.ResetPassword, model, cancellation);
    }
}
