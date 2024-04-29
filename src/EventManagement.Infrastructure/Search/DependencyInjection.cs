using System.Text;
using Elastic.Clients.Elasticsearch;
using Elastic.Transport;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using EventManagement.Infrastructure.Search.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
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
            var logger = provider.GetRequiredService<ILogger<ElasticsearchClient>>();
            return new ElasticsearchClient(new ElasticsearchClientSettings(new Uri(elasticOptions.Uri))
                .DisableDirectStreaming()
                .OnRequestCompleted(details =>
                {
                    if (details.RequestBodyInBytes is not null)
                    {
                        logger.LogWarning(Encoding.UTF8.GetString(details.RequestBodyInBytes));

                    }
                }));
        });

        services.AddScoped<ICommunitiesSearchService, CommunitiesSearchService>();
        services.AddScoped<IEventsSearchService, EventsSearchService>();

        return services;
    }
}
