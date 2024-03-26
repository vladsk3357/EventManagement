using EventManagement.Application.Common.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace EventManagement.Application.Common.Abilities;

internal static class DependencyInjection
{
    public static IServiceCollection AddAbilities(this IServiceCollection services)
    {
        services.AddScoped<IAbilitiesService, AbilitiesService>();

        void Register<T>() where T : AbilityBase
        {
            services.AddScoped<AbilityBase, T>();
        }

        Register<AttendEventAbility>();

        return services;
    }
}
