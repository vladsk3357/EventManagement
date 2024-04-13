using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure.Services;
using EventManagement.Infrastructure.Identity;
using EventManagement.Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using EventManagement.Infrastructure.Mail;
using EventManagement.Infrastructure.Options.Frontend;

namespace EventManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureOptions<FrontendOptionsSetup>();

        services.AddIdentity(configuration);
        services.AddPersistence(configuration);
        services.AddMails(configuration);

        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<IDomainEventService, DomainEventService>();

        services.AddDistributedMemoryCache();
        services.AddSingleton<ICacheService, CacheService>();

        return services;
    }
}
