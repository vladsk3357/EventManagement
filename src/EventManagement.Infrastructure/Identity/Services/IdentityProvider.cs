using EventManagement.Application.Common.Errors;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure.Identity.Providers.Firebase;
using FluentResults;

namespace EventManagement.Infrastructure.Identity.Services;

internal sealed class IdentityProvider : IIdentityProvider
{
    private readonly FirebaseIdentityProvider _firebaseIdentityProvider;

    public IdentityProvider(FirebaseIdentityProvider firebaseIdentityProvider)
    {
        _firebaseIdentityProvider = firebaseIdentityProvider;
    }

    public async Task<Result<string>> GetJwtForCredentialsAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        var jwt = await _firebaseIdentityProvider.SignInWithPasswordAsync(email, password, cancellationToken);

        return jwt is not null ? jwt : new InvalidCredentialsError();
    }
}
