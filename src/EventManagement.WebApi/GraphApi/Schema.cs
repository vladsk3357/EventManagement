using EventManagement.WebApi.GraphApi.Common.FieldMiddlewares;
using GraphQL.Instrumentation;
using GraphSchema = GraphQL.Types.Schema;

namespace EventManagement.WebApi.GraphApi;

internal class Schema : GraphSchema
{
    public Schema(IServiceProvider serviceProvider, IEnumerable<IFieldMiddleware> middlewares)
        : base(serviceProvider)
    {
        Query = serviceProvider.GetRequiredService<Query>();
        Mutation = serviceProvider.GetRequiredService<Mutation>();

        foreach (var middleware in middlewares)
            FieldMiddleware.Use(middleware);
    }
}
