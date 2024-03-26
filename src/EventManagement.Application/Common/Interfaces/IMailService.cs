using EventManagement.Application.Common.MailTemplateModels;

namespace EventManagement.Application.Common.Interfaces;

public interface IMailService
{
    Task SendEmailConfirmationMailAsync(string to, EmailConfirmationMailTemplateModel model, CancellationToken cancellation = default!);
    Task SendResetPasswordMailAsync(string to, ResetPasswordMailTemplateModel model, CancellationToken cancellation = default);
}
