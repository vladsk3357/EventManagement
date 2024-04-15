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
            var indexCommunitiesJobKey = new JobKey("IndexCommunitiesJob");
            q.AddJob<IndexCommunitiesJob>(opts => opts.WithIdentity(indexCommunitiesJobKey));

            q.AddTrigger(opts => opts
                .ForJob("IndexCommunitiesJob")
                .WithIdentity("IndexCommunitiesJob-trigger")
                .WithSimpleSchedule(s => s.WithIntervalInMinutes(1).RepeatForever())
            );

            var indexEventsJobKey = new JobKey("IndexEventsJob");
            q.AddJob<IndexEventsJob>(opts => opts.WithIdentity(indexEventsJobKey));

            q.AddTrigger(opts => opts
                .ForJob("IndexEventsJob")
                .WithIdentity("IndexEventsJob-trigger")
                .WithSimpleSchedule(s => s.WithIntervalInMinutes(1).RepeatForever())
            );

            q.UseMicrosoftDependencyInjectionJobFactory();
        });

        services.AddQuartzHostedService();

        return services;
    }
}
