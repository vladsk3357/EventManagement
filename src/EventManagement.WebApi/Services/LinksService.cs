using EventManagement.Application.Common.Interfaces;

namespace EventManagement.WebApi.Services;

internal sealed class LinksService : ILinksService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly LinkGenerator _linkGenerator;

    public LinksService(IHttpContextAccessor httpContextAccessor, LinkGenerator linkGenerator)
    {
        _httpContextAccessor = httpContextAccessor;
        _linkGenerator = linkGenerator;
    }

    public string GenerateEmailConfirmationLink(string token, string email) 
        => _linkGenerator.GetUriByRouteValues(
            _httpContextAccessor.HttpContext!,
            "EmailConfirmation",
            new { token, email })!;

    public string GenerateResetPasswordLink(string token, string email) 
        => _linkGenerator.GetUriByRouteValues(
            _httpContextAccessor.HttpContext!,
            "ResetPassword",
            new { token, email })!;
}
