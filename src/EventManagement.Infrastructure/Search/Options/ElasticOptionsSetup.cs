using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Search.Options;

internal sealed class ElasticOptionsSetup(IConfiguration configuration) : IConfigureOptions<ElasticOptions>
{
    private const string SectionName = "Elastic";
    private readonly IConfiguration _configuration = configuration;

    public void Configure(ElasticOptions options)
    {
        _configuration
           .GetSection(SectionName)
           .Bind(options);
    }
}
