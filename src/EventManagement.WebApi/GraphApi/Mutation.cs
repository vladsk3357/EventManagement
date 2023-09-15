using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi;

internal class Mutation : ObjectGraphType<object>
{
    public Mutation()
    {
        Name = "Mutation";

        Field<StringGraphType>("Ping")
            .Resolve(context => "Pong");
    }
}
