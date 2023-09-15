using GraphQL;
using GraphQL.Resolvers;

namespace EventManagement.WebApi.GraphApi.Common;

internal class EmptyFieldResolver: IFieldResolver
{
    public ValueTask<object?> ResolveAsync(IResolveFieldContext context) => new(new { });
}
