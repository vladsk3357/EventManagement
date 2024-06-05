using EventManagement.Domain.Entities;

namespace EventManagement.Application.Admin.Common;

public interface IAdminUserService
{
    Task<User?> GetUserByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<(List<User>, int)> GetUsersAsync(int page, int pageSize, CancellationToken cancellationToken = default);
    Task LockUser(string id, bool isLocked);
}
