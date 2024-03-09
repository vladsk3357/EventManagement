using EventManagement.Domain.Entities;

namespace EventManagement.Infrastructure.Identity.Mappers;

internal static class ApplicationUserMapper
{
    public static User ToEntity(this ApplicationUser applicationUser) => new()
    {
        Id = applicationUser.Id,
        Email = applicationUser.Email!,
        Birthday = applicationUser.Birthday is not null ? DateOnly.FromDateTime((DateTime)applicationUser.Birthday) : null,
        DomainEvents = applicationUser.DomainEvents,
        Information = applicationUser.Information,
        Language = applicationUser.Language,
        Location = applicationUser.Location,
        Name = applicationUser.Name,
        PhoneNumber = applicationUser.PhoneNumber,
        TimeZone = applicationUser.TimeZone,
        UserName = applicationUser.UserName!,
    };

    public static ApplicationUser ToApplicationUser(this User user) => new()
    {
        Id = user.Id!,
        Email = user.Email,
        Birthday = user.Birthday?.ToDateTime(TimeOnly.MinValue),
        DomainEvents = user.DomainEvents,
        Information = user.Information,
        Language = user.Language,
        Location = user.Location,
        Name = user.Name,
        PhoneNumber = user.PhoneNumber,
        TimeZone = user.TimeZone,
        UserName = user.UserName,
    };
}
