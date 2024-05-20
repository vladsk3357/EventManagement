﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Identity.Options.Jwt;

internal sealed class JwtOptionsSetup(IConfiguration configuration) : IConfigureOptions<JwtOptions>
{
    private const string SectionName = "Jwt";
    private readonly IConfiguration _configuration = configuration;

    public void Configure(JwtOptions options)
    {
        _configuration
            .GetSection(SectionName)
            .Bind(options);
    }
}
