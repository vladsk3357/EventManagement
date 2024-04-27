using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.FilesStorage.Options;

internal class StorageAccountOptionsSetup(IConfiguration configuration) : IConfigureOptions<StorageAccountOptions>
{
    private const string SectionName = "StorageAccount";
    private readonly IConfiguration _configuration = configuration;

    public void Configure(StorageAccountOptions options)
    {
        _configuration
            .GetSection(SectionName)
            .Bind(options);
    }
}
