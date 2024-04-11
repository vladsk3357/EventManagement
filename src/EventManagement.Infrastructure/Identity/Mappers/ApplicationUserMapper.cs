using EventManagement.Domain.Entities;

namespace EventManagement.Infrastructure.Identity.Mappers;

internal static class ApplicationUserMapper
{
    public static User ToEntity(this ApplicationUser applicationUser) => new()
    {
        Id = applicationUser.Id,
        Email = applicationUser.Email!,
        DomainEvents = applicationUser.DomainEvents,
        Information = applicationUser.Information,
        Location = applicationUser.Location,
        Name = applicationUser.Name,
        UserName = applicationUser.UserName!,
    };

    public static ApplicationUser ToApplicationUser(this User user) => new()
    {
        Id = user.Id!,
        Email = user.Email,
        DomainEvents = user.DomainEvents,
        Information = user.Information,
        Location = user.Location,
        Name = user.Name,
        UserName = user.UserName,
    };
}
