using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi;

internal class Query : ObjectGraphType<object>
{
    public Query()
    {
        Name = "Query";

        Field<StringGraphType>("Ping")
            .Resolve(context => "Pong");
    }
}
