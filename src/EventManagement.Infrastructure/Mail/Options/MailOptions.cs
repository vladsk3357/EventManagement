namespace EventManagement.Infrastructure.Mail.Options;

internal sealed class MailOptions
{
    public string Address { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string Host { get; set; } = default!;

    public string Password { get; set; } = default!;

    public int Port { get; set; }
}
