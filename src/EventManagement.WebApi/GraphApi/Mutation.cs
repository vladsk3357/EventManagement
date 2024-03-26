using EventManagement.WebApi.GraphApi.Common;
using EventManagement.WebApi.GraphApi.Profile;
using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi;

internal class Mutation : ObjectGraphType
{
    public Mutation()
    {
        Name = "Mutation";

        Field<StringGraphType>("Ping")
            .Resolve(context => "Pong");

        Field<ProfileMutationType>("Profile").ResolveEmpty();
    }
}
