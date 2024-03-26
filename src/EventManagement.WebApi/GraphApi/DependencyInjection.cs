using EventManagement.WebApi.GraphApi.Common;
using EventManagement.WebApi.GraphApi.Profile;
using GraphQL;

namespace EventManagement.WebApi.GraphApi;

public static class DependencyInjection
{
    public static void AddGraphApi(this IServiceCollection services)
    {
        services.AddGraphQL(b => b
            .AddSystemTextJson()
            .AddSchema<Schema>()
            .AddGraphTypes(typeof(Schema).Assembly));


        services.AddCommonGraphApi();
        services.AddProfileGraphApi();
    }
}
