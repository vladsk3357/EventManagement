using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Identity.Options;

internal sealed class IdentityOptionsSetup : IConfigureOptions<IdentityOptions>
{
    private const string SectionName = "Identity";
    private readonly IConfiguration _configuration;

    public IdentityOptionsSetup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void Configure(IdentityOptions options)
    {
        _configuration
            .GetSection(SectionName)
            .Bind(options);
    }
}
