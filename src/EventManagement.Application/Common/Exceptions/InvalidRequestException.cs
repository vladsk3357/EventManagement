namespace EventManagement.Application.Common.Exceptions;

public class InvalidRequestException : Exception
{
    public InvalidRequestException(string property, string message)
    {
        Errors = new Dictionary<string, string[]>
        {
            { property, new[] { message } }
        };
    }

    public IDictionary<string, string[]> Errors { get; }
}
