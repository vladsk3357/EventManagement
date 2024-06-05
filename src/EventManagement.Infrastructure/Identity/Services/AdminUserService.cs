using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventManagement.Application.Admin.Common;
using EventManagement.Domain.Entities;
using EventManagement.Infrastructure.Identity.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Infrastructure.Identity.Services;

internal sealed class AdminUserService(UserManager<ApplicationUser> userManager) : IAdminUserService
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;

    public async Task<(List<User>, int)> GetUsersAsync(int page, int pageSize, CancellationToken cancellationToken = default)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(page, 1);
        ArgumentOutOfRangeException.ThrowIfLessThan(pageSize, 1);

        var users = await _userManager.Users
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
        var totalCount = await _userManager.Users.CountAsync(cancellationToken);

        return (users.Select(u => u.ToEntity()).ToList(), totalCount);
    }

    public async Task<User?> GetUserByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(id);

        var user = await _userManager.FindByIdAsync(id);

        return user?.ToEntity();
    }

    public async Task LockUser(string id, bool isLocked)
    {
        ArgumentNullException.ThrowIfNull(id);
        var user = await _userManager.FindByIdAsync(id) ?? throw new InvalidOperationException($"User with id {id} not found");

        await _userManager.SetLockoutEndDateAsync(user, isLocked ? DateTimeOffset.MaxValue : null);
    }
}
