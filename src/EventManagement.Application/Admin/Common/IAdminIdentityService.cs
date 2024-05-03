
namespace EventManagement.Application.Admin.Common;

public interface IAdminIdentityService
{
    Task<bool> SignInAsync(string email, string password, string role, CancellationToken cancellationToken = default);
    
    Task SignOutAsync();
}
