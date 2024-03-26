using EventManagement.Domain.Entities;
using FirebaseAdmin.Auth;

namespace EventManagement.Infrastructure.Identity.Mappers;

internal static class UserRecordMapper
{
    public static User ToEntity(this UserRecord userRecord) => new()
    {
        Id = userRecord.Uid,
        Email = userRecord.Email,
        Name = userRecord.DisplayName
    };
}
