using GraphQL;
using GraphQL.Builders;
using GraphQL.MicrosoftDI;
using MediatR;

namespace EventManagement.WebApi.GraphApi.Common;

internal static class FieldBuilderExtensions
{
    public static FieldBuilder<TSourceType, TReturnType> ResolveEmpty<TSourceType, TReturnType>(
        this FieldBuilder<TSourceType, TReturnType> fieldBuilder)
            => fieldBuilder.Resolve(new EmptyFieldResolver());

    public static ResolverBuilder<TSourceType, TReturnType, ISender> ResolveWithSender<TSourceType, TReturnType>(
        this FieldBuilder<TSourceType, TReturnType> fieldBuilder)
            => fieldBuilder
                .Resolve()
                .WithScope()
                .WithService<ISender>();
}
