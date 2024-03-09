namespace EventManagement.Infrastructure.Identity.Models;

internal record UserMetadata(
    string IdentityId,
    DateTime Created,
    string? CreatedBy,
    DateTime? LastModified,
    string? LastModifiedBy);
