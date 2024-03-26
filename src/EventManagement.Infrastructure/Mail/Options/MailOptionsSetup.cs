using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Mail.Options;

internal sealed class MailOptionsSetup : IConfigureOptions<MailOptions>
{
    private const string SectionName = "Mail";
    private readonly IConfiguration _configuration;

    public MailOptionsSetup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void Configure(MailOptions options)
    {
        _configuration
            .GetSection(SectionName)
            .Bind(options);
    }
}
