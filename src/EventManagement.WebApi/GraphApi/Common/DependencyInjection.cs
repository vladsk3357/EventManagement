using EventManagement.WebApi.GraphApi.Common.FieldMiddlewares;
using GraphQL.Instrumentation;

namespace EventManagement.WebApi.GraphApi.Common;

public static class DependencyInjection
{
    public static IServiceCollection AddCommonGraphApi(this IServiceCollection services)
    {
        services.AddSingleton<IFieldMiddleware, ErrorHandlerFieldMiddleware>();

        return services;
    }
}
