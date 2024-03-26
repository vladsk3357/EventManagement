using Dapper;
using EventManagement.Infrastructure.Identity.Interfaces;
using EventManagement.Infrastructure.Identity.Models;
using EventManagement.Infrastructure.Persistence.Mappers;
using EventManagement.Infrastructure.Persistence.Models;

namespace EventManagement.Infrastructure.Persistence.Repositories;

internal class UserMetadataRepository : IUserMetadataRepository
{
    private readonly DatabaseContext _databaseContext;

    public UserMetadataRepository(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public async Task<UserMetadata?> GetUserMetadataByIdentityIdAsync(string identityId)
    {
        ArgumentException.ThrowIfNullOrEmpty(identityId);

        if (string.IsNullOrWhiteSpace(identityId))
            return await Task.FromResult<UserMetadata?>(null);

        using var connection = _databaseContext.CreateConnection();

        var sqlbuilder = new SqlBuilder()
            .Select($"""
                [IdentityId] as {nameof(UserMetadataModel.IdentityId)}, 
                [Created] as {nameof(UserMetadataModel.Created)},
                [CreatedBy] as {nameof(UserMetadataModel.CreatedBy)},
                [LastModified] as {nameof(UserMetadataModel.LastModified)},
                [LastModifiedBy] as {nameof(UserMetadataModel.LastModifiedBy)}
                """)
            .Where($"IdentityId = @{nameof(identityId)}", new { identityId })
            .AddTemplate($"/**select**/ from [UserMetadata] /**where**/");

        var userMetadataModel = await connection.QuerySingleOrDefaultAsync<UserMetadataModel>(
            sqlbuilder.RawSql, sqlbuilder.Parameters);

        return userMetadataModel.ToEntity();
    }

    public async Task AddUserMetadataAsync(UserMetadata userMetadata)
    {
        ArgumentNullException.ThrowIfNull(nameof(userMetadata));

        var model = userMetadata.ToModel();

        var sql = $"""
            INSERT INTO [UserMetadata] ([IdentityId], [Created], [CreatedBy])
            VALUES (
                @{nameof(UserMetadataModel.IdentityId)}, 
                @{nameof(UserMetadataModel.Created)}, 
                @{nameof(UserMetadataModel.CreatedBy)})
            """;

        using var connection = _databaseContext.CreateConnection();
        await connection.ExecuteAsync(sql, new
        {
            model.IdentityId,
            model.Created,
            model.CreatedBy
        });
    }
}
