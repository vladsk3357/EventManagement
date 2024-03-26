using System.Text.Json.Serialization;

namespace EventManagement.Infrastructure.Identity.Providers.Firebase;

internal class SignInWithPassword
{
    internal class Request
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        [JsonPropertyName("returnSecureToken")]
        public bool ReturnSecureToken { get; set; }
    }

    internal class Response
    {
        [JsonPropertyName("idToken")]
        public string IdToken { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("refreshToken")]
        public string RefreshToken { get; set; }

        [JsonPropertyName("expiresIn")]
        public string ExpiresIn { get; set; }

        [JsonPropertyName("localId")]
        public string LocalId { get; set; }

        [JsonPropertyName("registered")]
        public bool Registered { get; set; }
    }

    internal class ErrorCodes
    {
        public const string EmailNotFound = "EMAIL_NOT_FOUND";

        public const string InvalidPassword = "INVALID_PASSWORD";

        public const string UserDisabled = "USER_DISABLED";
    }
}
