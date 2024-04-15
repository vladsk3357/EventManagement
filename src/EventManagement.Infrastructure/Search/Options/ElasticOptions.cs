namespace EventManagement.Infrastructure.Search.Options;

internal sealed class ElasticOptions
{
    public string Uri { get; init; } = default!;

    public Indices Indices { get; init; } = default!;
}

internal sealed class Indices
{
    public string Community { get; init; } = default!;

    public string Event { get; init; } = default!;
}
