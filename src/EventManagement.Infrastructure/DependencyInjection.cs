using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Caching.Memory;

namespace EventManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddTransient<IDateTime, DateTimeService>();

        services.AddDistributedMemoryCache();
        services.AddSingleton<ICacheService, CacheService>();


        return services;
    }
}
