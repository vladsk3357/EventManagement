namespace EventManagement.Infrastructure.Identity.Options;

internal sealed class IdentityOptions
{
    public string Uri { get; init; } = string.Empty;

    public string Audience { get; init; } = string.Empty;

    public string ValidIssuer { get; init; } = string.Empty;

    public string ApiKey { get; init; } = string.Empty;
}
