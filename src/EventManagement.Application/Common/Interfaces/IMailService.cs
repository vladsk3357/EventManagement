using EventManagement.Application.Common.MailTemplateModels;

namespace EventManagement.Application.Common.Interfaces;

public interface IMailService
{
    Task SendEmailAsync(IEnumerable<string> to, string subject, string message, CancellationToken cancellationToken = default);

    Task SendEmailConfirmationMailAsync(string to, EmailConfirmationMailTemplateModel model, CancellationToken cancellation = default!);

    Task SendResetPasswordMailAsync(string to, ResetPasswordMailTemplateModel model, CancellationToken cancellation = default);
}
