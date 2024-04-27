using EventManagement.Domain.Common;
using Microsoft.AspNetCore.Identity;

namespace EventManagement.Infrastructure.Identity;

internal class ApplicationUser : IdentityUser, IHasDomainEvent
{
    [PersonalData]
    public string Name { get; set; } = default!;

    [PersonalData]
    public string? Location { get; set; }

    public string? Information { get; set; }

    public string? ProfileImage { get; set; }

    public List<DomainEvent> DomainEvents { get; set; } = [];
}
