using FluentResults;

namespace EventManagement.Application.Common.Interfaces;

public interface IIdentityProvider
{
    Task<Result<string>> GetJwtForCredentialsAsync(string email, string password, CancellationToken cancellationToken = default);
}
