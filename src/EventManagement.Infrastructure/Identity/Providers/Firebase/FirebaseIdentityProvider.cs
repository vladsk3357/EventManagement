using System.Net;
using EventManagement.Infrastructure.Identity.Options;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;

namespace EventManagement.Infrastructure.Identity.Providers.Firebase;

internal sealed class FirebaseIdentityProvider : IDisposable
{
    private readonly RestClient _client;

    public FirebaseIdentityProvider(IdentityOptions options)
    {
        var clientOptions = new RestClientOptions(options.Uri);

        _client = new RestClient(clientOptions);
        _client.AddDefaultQueryParameter("key", options.ApiKey);
    }

    public async Task<string?> SignInWithPasswordAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        var body = new SignInWithPassword.Request
        {
            Email = email,
            Password = password,
            ReturnSecureToken = true,
        };

        var request = new RestRequest("./accounts:signInWithPassword").AddBody(body);
        var response = await _client.ExecutePostAsync<SignInWithPassword.Response>(request, cancellationToken);

        if (response.IsSuccessful)
        {
            return response.Data?.IdToken;
        }
        else if (response.StatusCode == HttpStatusCode.BadRequest)
        {
            var error = JsonConvert.DeserializeObject<ErrorResponse>(response.Content!);
            if (error.Error.Message == SignInWithPassword.ErrorCodes.InvalidPassword || error.Error.Message == SignInWithPassword.ErrorCodes.EmailNotFound)
                return null;
        }

        return null;
    }

    public void Dispose()
    {
        _client?.Dispose();
        GC.SuppressFinalize(this);
    }
}
