using Elastic.Clients.Elasticsearch;
using EventManagement.Application.Services.Search;
using EventManagement.Infrastructure.Search.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Search;

internal static class DependencyInjection
{
    public static IServiceCollection AddSearch(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureOptions<ElasticOptionsSetup>();

        services.AddSingleton(provider =>
        {
            var elasticOptions = provider.GetRequiredService<IOptions<ElasticOptions>>().Value;
            return new ElasticsearchClient(new Uri(elasticOptions.Uri));
        });

        services.AddScoped<ISearchService, SearchService>();

        return services;
    }
}
