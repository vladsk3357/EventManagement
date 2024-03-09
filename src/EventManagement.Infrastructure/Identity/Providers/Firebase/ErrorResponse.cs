using System.Text.Json.Serialization;

namespace EventManagement.Infrastructure.Identity.Providers.Firebase;

internal class ErrorResponse
{
    [JsonPropertyName("error")]
    public ErrorStatus Error { get; set; } = default!;

    internal class ErrorStatus
    {
        [JsonPropertyName("code")]
        public int Code { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; } = default!;

        [JsonPropertyName("errors")]
        public List<ErrorDetail> Errors { get; set; } = default!;

        internal class ErrorDetail
        {
            [JsonPropertyName("message")]
            public string Message { get; set; } = default!;

            [JsonPropertyName("domain")]
            public string Domain { get; set; } = default!;

            [JsonPropertyName("reason")]
            public string Reason { get; set; } = default!;
        }
    }
}
