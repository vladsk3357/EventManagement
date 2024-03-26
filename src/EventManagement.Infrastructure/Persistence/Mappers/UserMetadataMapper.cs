using EventManagement.Infrastructure.Identity.Models;
using EventManagement.Infrastructure.Persistence.Models;

namespace EventManagement.Infrastructure.Persistence.Mappers;

internal static class UserMetadataMapper
{
    public static UserMetadataModel ToModel(this UserMetadata entity) => new()
    {
        IdentityId = entity.IdentityId,
        Created = entity.Created,
        CreatedBy = entity.CreatedBy,
        LastModified = entity.LastModified,
        LastModifiedBy = entity.LastModifiedBy,
    };

    public static UserMetadata ToEntity(this UserMetadataModel model) => new(
        model.IdentityId,
        model.Created,
        model.CreatedBy,
        model.LastModified,
        model.LastModifiedBy);
}
