using EventManagement.Application.Admin.Common;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

namespace EventManagement.Infrastructure.Identity.Services;

internal sealed class AdminIdentityService(
    UserManager<ApplicationUser> userManager,
    RoleManager<IdentityRole> roleManager,
    SignInManager<ApplicationUser> signInManager) : IAdminIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;

    public async Task<bool> SignInAsync(string email, string password, string role, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(email))
            throw new ArgumentException("Email can't be null or empty string.");

        if (string.IsNullOrEmpty(password))
            throw new ArgumentException("Password can't be null or empty string.");

        var user = await _userManager.FindByEmailAsync(email);

        if (user is null)
            return false;

        if (!await _userManager.IsInRoleAsync(user, role))
            return false;
        _signInManager.AuthenticationScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        var result = await _signInManager.PasswordSignInAsync(user, password, false, false);
        return result.Succeeded;
    }

    public async Task SignOutAsync()
    {
        await _signInManager.SignOutAsync();
    }
}
