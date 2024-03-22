using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi;

internal class Query : ObjectGraphType
{
    public Query()
    {
        Name = "Query";

        Field<StringGraphType>("Ping")
            .Resolve(context => "Pong");
    }
}
