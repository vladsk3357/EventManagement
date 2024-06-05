using EventManagement.Application.Admin.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Quartz;

namespace EventManagement.Infrastructure.Jobs;

internal static class DependencyInjection
{
    public static IServiceCollection AddJobs(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddQuartz(q =>
        {
            var indexCommunitiesJobKey = new JobKey("IndexCommunitiesJob", "Index");
            q.AddJob<IndexCommunitiesJob>(opts => opts.WithIdentity(indexCommunitiesJobKey));

            q.AddTrigger(opts => opts
                .ForJob("IndexCommunitiesJob", "Index")
                .WithIdentity("IndexCommunitiesJob-trigger")
                .WithSimpleSchedule(s => s.WithIntervalInMinutes(60).RepeatForever())
            );

            var indexEventsJobKey = new JobKey("IndexEventsJob", "Index");
            q.AddJob<IndexEventsJob>(opts => opts.WithIdentity(indexEventsJobKey));

            q.AddTrigger(opts => opts
                .ForJob("IndexEventsJob", "Index")
                .WithIdentity("IndexEventsJob-trigger")
                .WithSimpleSchedule(s => s.WithIntervalInMinutes(60).RepeatForever())
            );

            q.UseMicrosoftDependencyInjectionJobFactory();
        });

        services.AddQuartzHostedService();
        services.AddScoped<IReindexService, ReindexService>();

        return services;
    }
}
