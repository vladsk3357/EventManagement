using GraphSchema = GraphQL.Types.Schema;

namespace EventManagement.WebApi.GraphApi;

internal class Schema : GraphSchema
{
    public Schema(IServiceProvider serviceProvider)
        : base(serviceProvider)
    {
        Query = serviceProvider.GetRequiredService<Query>();
        Mutation = serviceProvider.GetRequiredService<Mutation>();
    }
}
