using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure.Mail.Options;
using EventManagement.Infrastructure.Mail.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventManagement.Infrastructure.Mail;

internal static class DependencyInjection
{
    public static IServiceCollection AddMails(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureOptions<MailOptionsSetup>();
        services.AddTransient<IMailService, MailService>();

        return services;
    }
}
