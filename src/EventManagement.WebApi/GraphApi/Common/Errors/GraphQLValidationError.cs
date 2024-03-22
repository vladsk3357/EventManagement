using GraphQL;

namespace EventManagement.WebApi.GraphApi.Common.Errors;

public class GraphQLValidationError : ExecutionError
{
    public GraphQLValidationError(string message) : base(message)
    {
        Code = "INVALID_INPUT";
    }
}
