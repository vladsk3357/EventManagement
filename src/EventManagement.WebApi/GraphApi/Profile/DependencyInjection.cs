namespace EventManagement.WebApi.GraphApi.Profile;

public static class DependencyInjection
{
    public static IServiceCollection AddProfileGraphApi(this IServiceCollection services)
    {
        services.AddTransient<User.UserFieldBuilder>();

        services.AddTransient<User.Resolvers.RegisterResolver>();
        services.AddTransient<User.Resolvers.LoginResolver>();

        return services;
    }
}
