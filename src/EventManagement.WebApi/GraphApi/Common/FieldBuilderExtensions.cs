using GraphQL.Builders;

namespace EventManagement.WebApi.GraphApi.Common;

internal static class FieldBuilderExtensions
{
    public static FieldBuilder<TSourceType, TReturnType> Resolve<TSourceType, TReturnType>(this FieldBuilder<TSourceType, TReturnType> fieldBuilder) 
        => fieldBuilder.Resolve(new EmptyFieldResolver());
}
