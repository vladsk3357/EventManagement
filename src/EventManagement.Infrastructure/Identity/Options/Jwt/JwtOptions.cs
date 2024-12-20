﻿namespace EventManagement.Infrastructure.Identity.Options.Jwt;

internal sealed class JwtOptions
{
    public string Secret { get; init; } = string.Empty;

    public TimeSpan TokenLifetime { get; init; }

    public TimeSpan RefreshTokenLifetime { get; init; }
}
