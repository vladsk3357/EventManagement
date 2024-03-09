using EventManagement.Infrastructure.Identity.Models;

namespace EventManagement.Infrastructure.Identity.Interfaces;

internal interface IUserMetadataRepository
{
    Task<UserMetadata?> GetUserMetadataByIdentityIdAsync(string identityId);
    Task AddUserMetadataAsync(UserMetadata userMetadata);
}
