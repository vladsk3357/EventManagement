using EventManagement.Infrastructure.Mail.Options;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using RazorEngineCore;

namespace EventManagement.Infrastructure.Mail.Services;

internal class MailServiceCore
{
    private readonly MailOptions _options;

    public MailServiceCore(IOptions<MailOptions> options)
    {
        _options = options.Value;
    }

    public async Task SendEmailAsync<T>(IEnumerable<string> to, string subject, string templateName, T model, CancellationToken cancellationToken = default)
    {
        var message = await GetEmailTemplate(templateName, model, cancellationToken);
        await SendEmailAsync(to, subject, message, cancellationToken);
    }

    public async Task SendEmailAsync(IEnumerable<string> to, string subject, string message, CancellationToken cancellationToken = default)
    {
        var mail = CreateMailMessage(to, subject, message);

        using var client = new SmtpClient();
        await client.ConnectAsync(_options.Host, _options.Port, false, cancellationToken);
        await client.AuthenticateAsync(_options.Address, _options.Password, cancellationToken);
        await client.SendAsync(mail, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
    }

    private MimeMessage CreateMailMessage(IEnumerable<string> to, string subject, string message)
    {
        var mail = new MimeMessage();
        mail.From.Add(new MailboxAddress(_options.Name, _options.Address));

        foreach (var toAddress in to)
            mail.To.Add(new MailboxAddress("", toAddress));

        mail.Subject = subject;
        mail.Body = new TextPart("html")
        {
            Text = message,
        };

        return mail;
    }

    private static async Task<string> GetEmailTemplate<T>(string templateName, T model, CancellationToken cancellationToken = default)
    {
        var templateText = await GetEmailTemplateTextAsync(templateName, cancellationToken);
        var razorEngine = new RazorEngine();
        var compiledTemplate = await razorEngine.CompileAsync<RazorEngineTemplateBase<T>>(templateText);
        return await compiledTemplate.RunAsync(i => i.Model = model);
    }

    private static async Task<string> GetEmailTemplateTextAsync(string templateName, CancellationToken cancellationToken = default)
    {
        var templatePath = Path.Combine(GetEmailTemplatesFolderPath(), $"{templateName}.cshtml");
        return await File.ReadAllTextAsync(templatePath, cancellationToken);
    }

    private static string GetEmailTemplatesFolderPath()
    {
        var currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
        var templatesFolderPath = Path.Combine(currentDirectory, "Mail", "Templates");
        return templatesFolderPath;
    }
}
