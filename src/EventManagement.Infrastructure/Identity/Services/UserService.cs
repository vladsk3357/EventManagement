using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using EventManagement.Infrastructure.Identity.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;

namespace EventManagement.Infrastructure.Identity.Services;

internal class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        ArgumentException.ThrowIfNullOrEmpty(email);

        var user = await _userManager.FindByEmailAsync(email);
        return user?.ToEntity();
    }

    public async Task<bool> IsEmailTakenAsync(string email, CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(email);

        var user = await _userManager.FindByEmailAsync(email);
        return user is not null;
    }

    public async Task<User> UpdateUserInfoAsync(User user, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(user);

        var applicationUser = user.ToApplicationUser();
        var storedUser = await _userManager.FindByIdAsync(user.Id);
        UpdateUserInfo(storedUser, applicationUser);
        var result = await _userManager.UpdateAsync(storedUser);

        return !result.Succeeded 
            ? throw new InvalidOperationException("Не вдалося оновити інформацію про користувача") 
            : storedUser.ToEntity();
    }

    private static void UpdateUserInfo(ApplicationUser storedUser, ApplicationUser updatedUser)
    {
        storedUser.Name = updatedUser.Name;
        storedUser.Location = updatedUser.Location;
        storedUser.Information = updatedUser.Information;
        storedUser.UserName = updatedUser.UserName;
    }

    public async Task<User?> GetUserByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(id);

        var user = await _userManager.FindByIdAsync(id);

        return user?.ToEntity();
    }

    public async Task<List<User>> GetUsersByIdListAsync(IEnumerable<string> ids, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(ids);

        var users = await _userManager.Users.Where(u => ids.Contains(u.Id)).ToListAsync(cancellationToken);

        return users.Select(u => u.ToEntity()).ToList();
    }

    public Task<List<User>> GetUsersByEmailListAsync(IEnumerable<string> emails, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(emails);

        return _userManager.Users.Where(u => emails.Contains(u.Email))
            .Select(u => u.ToEntity())
            .ToListAsync(cancellationToken);
    }
}
