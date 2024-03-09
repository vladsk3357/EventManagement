using EventManagement.Domain.Entities;

namespace EventManagement.Application.Common.Interfaces;

public interface IUserService
{
    Task<User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<List<User>> GetUsersByIdListAsync(IEnumerable<string> ids, CancellationToken cancellationToken = default);
    Task<bool> IsEmailTakenAsync(string email, CancellationToken cancellationToken = default);
    Task<User> UpdateUserInfoAsync(User user, CancellationToken cancellationToken = default);
}
