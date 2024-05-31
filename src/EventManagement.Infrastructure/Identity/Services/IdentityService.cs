using System.Text.RegularExpressions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.User;
using EventManagement.Domain.Events;
using EventManagement.Infrastructure.Identity.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace EventManagement.Infrastructure.Identity.Services;

internal class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtService _jwtService;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;
    private readonly IDateTime _dateTime;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IJwtService jwtService,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        IAuthorizationService authorizationService,
        IDateTime dateTime)
    {
        _userManager = userManager;
        _jwtService = jwtService;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
        _dateTime = dateTime;
    }

    public async Task<RegisterUserResult> RegisterUserAsync(RegisterUserInput input, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(input);

        var user = new ApplicationUser
        {
            Email = input.Email,
            Name = input.Name,
            UserName = ReplaceNonAlphaNumericWithUnderscore(input.Email),
        };

        var entity = user.ToEntity();
        user.DomainEvents.Add(new UserRegisteredEvent(entity));

        var result = await _userManager.CreateAsync(user, input.Password);
        return new RegisterUserResult(
            result.Succeeded,
            result.Errors.Select(x => x.Description).FirstOrDefault(),
            result.Succeeded ? entity : null);
    }

    private static string ReplaceNonAlphaNumericWithUnderscore(string input)
    {
        if (input is null)
        {
            throw new ArgumentNullException(nameof(input), "Input string cannot be null.");
        }

        // Replace all non-alphanumeric characters with an underscore
        string result = Regex.Replace(input, @"[^a-zA-Z0-9]", "_");
        return result;
    }

    public async Task<bool> ConfirmEmailAsync(string token, string email, CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(token);
        ArgumentException.ThrowIfNullOrEmpty(email);

        var user = await _userManager.FindByEmailAsync(email) 
            ?? throw new InvalidOperationException("Користувача з таким email не знайдено");
        var result = await _userManager.ConfirmEmailAsync(user, token);
        return result.Succeeded;
    }

    public async Task<string> GenerateEmailConfirmationToken(string email, CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(email);

        var user = await _userManager.FindByEmailAsync(email) 
            ?? throw new InvalidOperationException("Користувача з таким email не знайдено");
        return await _userManager.GenerateEmailConfirmationTokenAsync(user);
    }

    public async Task<string> GenerateResetPasswordTokenAsync(string email, CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(email);

        var user = await _userManager.FindByEmailAsync(email) 
            ?? throw new InvalidOperationException("Користувача з таким email не знайдено");
        return await _userManager.GeneratePasswordResetTokenAsync(user);
    }

    public async Task<bool> ResetPasswordAsync(string email, string password, string token)
    {
        ArgumentException.ThrowIfNullOrEmpty(email);
        ArgumentException.ThrowIfNullOrEmpty(password);
        ArgumentException.ThrowIfNullOrEmpty(token);
        
        var user = await _userManager.FindByEmailAsync(email) 
            ?? throw new InvalidOperationException("Користувача з таким email не знайдено");

        var result = await _userManager.ResetPasswordAsync(user, token, password);
        return result.Succeeded;
    }

    public async Task<AuthToken?> AuthenticateAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(email))
            return null;

        if (string.IsNullOrEmpty(password))
            return null;

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null || user.LockoutEnd > _dateTime.Now)
            return null;

        var isValidPassword = await _userManager.CheckPasswordAsync(user, password);

        if (!isValidPassword)
            return null;

        return await _jwtService.GenerateJwtForUser(user.ToEntity(), cancellationToken);
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<AuthToken> RefreshTokenAsync(string token, string refreshToken, CancellationToken cancellationToken = default)
    {
        return await _jwtService.RefreshTokenAsync(token, refreshToken, cancellationToken);
    }

    public async Task<bool> IsUserLockedAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        return user?.LockoutEnd > _dateTime.Now;
    }
}
