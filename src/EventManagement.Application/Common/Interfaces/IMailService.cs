using EventManagement.Application.Common.MailTemplateModels;
using EventManagement.Domain.Entities.Community;

namespace EventManagement.Application.Common.Interfaces;

public interface IMailService
{
    Task SendEmailAsync(IEnumerable<string> to, string subject, string message, CancellationToken cancellationToken = default);

    Task SendEmailConfirmationMailAsync(string to, EmailConfirmationMailTemplateModel model, CancellationToken cancellation = default!);

    Task SendResetPasswordMailAsync(string to, ResetPasswordMailTemplateModel model, CancellationToken cancellation = default);

    Task SendInvitationToCommunityMailAsync(string to, Community community, CancellationToken cancellation = default);
    Task SendCommunicationEmailAsync(string to, string subject, string message, Community community, CancellationToken cancellation = default);
}
