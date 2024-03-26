using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure.Services;
using EventManagement.Infrastructure.Identity;
using EventManagement.Infrastructure.Identity.Interfaces;
using EventManagement.Infrastructure.Persistence.Repositories;
using EventManagement.Infrastructure.Persistence;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using EventManagement.Infrastructure.Mail;

namespace EventManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentity(configuration);
        services.AddPersistence(configuration);
        services.AddMails(configuration);

        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<IDomainEventService, DomainEventService>();
        services.AddTransient<IUserMetadataRepository, UserMetadataRepository>();
        services.AddTransient<DatabaseContext>();

        services.AddDistributedMemoryCache();
        services.AddSingleton<ICacheService, CacheService>();

        FirebaseApp.Create(new AppOptions
        {
            Credential = GoogleCredential.FromFile("firebase-adminsdk.json"),
        });

        

        return services;
    }
}
