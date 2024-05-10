using EventManagement.Application.Common.Models.User;

namespace EventManagement.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<RegisterUserResult> RegisterUserAsync(RegisterUserInput input, CancellationToken cancellationToken = default);
    
    Task<bool> ConfirmEmailAsync(string token, string email, CancellationToken cancellationToken = default);
    
    Task<string> GenerateEmailConfirmationToken(string email, CancellationToken cancellationToken = default);
    
    Task<AuthToken?> AuthenticateAsync(string email, string password, CancellationToken cancellationToken = default);
    
    Task<string> GenerateResetPasswordTokenAsync(string email, CancellationToken cancellationToken = default);
    
    Task<bool> ResetPasswordAsync(string email, string password, string token);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<AuthToken> RefreshTokenAsync(string token, string refreshToken, CancellationToken cancellationToken = default);
    
    Task<bool> IsUserLockedAsync(string id);
}
