using System.Text;
using EventManagement.Application.Admin.Common;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure.Identity.Options.Jwt;
using EventManagement.Infrastructure.Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace EventManagement.Infrastructure.Identity;

internal static class DependencyInjection
{
    public static IServiceCollection AddIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureOptions<JwtOptionsSetup>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IIdentityService, IdentityService>();
        services.AddTransient<IAdminIdentityService, AdminIdentityService>();
        services.AddTransient<IAdminUserService, AdminUserService>();
        services.AddTransient<IJwtService, JwtService>();

        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 3;
        })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddRoles<IdentityRole>()
            .AddDefaultTokenProviders();

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(
                    services.BuildServiceProvider().GetRequiredService<IOptions<JwtOptions>>().Value.Secret
                    )
                ),
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = false,
            ValidateLifetime = false,
        };

        services.AddSingleton(tokenValidationParameters);

        services.AddAuthentication()
            .AddJwtBearer(x =>
            {
                x.SaveToken = true;
                x.TokenValidationParameters = tokenValidationParameters;
            })
            .AddCookie(options =>
            {
                 options.LoginPath = "/admin/account/login";
                 options.AccessDeniedPath = "/admin/account/login";
                 options.LogoutPath = "/admin/account/logout";
            });

        return services;
    }
}
