using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Options.Frontend;

internal sealed class FrontendOptionsSetup(IConfiguration configuration) 
    : IConfigureOptions<FrontendOptions>
{
    private const string SectionName = "Frontend";
    private readonly IConfiguration _configuration = configuration;

    public void Configure(FrontendOptions options)
    {
        _configuration
            .GetSection(SectionName)
            .Bind(options);
    }
}
