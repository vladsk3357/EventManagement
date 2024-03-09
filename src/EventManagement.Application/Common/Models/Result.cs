namespace EventManagement.Application.Common.Models;

public class Result<T>
{
    internal Result(T data, bool succeeded, IEnumerable<string>? errors = null)
    {
        Data = data;
        Succeeded = succeeded;
        Errors = errors ?? Enumerable.Empty<string>();
    }

    public T Data { get; }

    public bool Succeeded { get; }

    public IEnumerable<string> Errors { get; }

    public static Result<T> Success(T data)
    {
        return new(data, true);
    }

    public static Result<T> Failure(IEnumerable<string> errors)
    {
        return new(default!, false, errors);
    }

    public static Result<T> Failure(string error)
    {
        return new(default!, false, new[] { error });
    }
}
