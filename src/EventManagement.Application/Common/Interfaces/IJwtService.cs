using EventManagement.Application.Common.Models.User;
using EventManagement.Domain.Entities;

namespace EventManagement.Application.Common.Interfaces;

public interface IJwtService
{
    Task<AuthToken> GenerateJwtForUser(User user, CancellationToken cancellationToken = default);

    Task<AuthToken> RefreshTokenAsync(string token, string refreshToken, CancellationToken cancellationToken = default);
}
