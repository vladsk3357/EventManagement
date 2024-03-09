namespace EventManagement.Infrastructure.Persistence.Models;

internal class UserMetadataModel : AuditableModel
{
    public string IdentityId { get; set; } = default!;
}