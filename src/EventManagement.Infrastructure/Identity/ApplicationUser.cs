using EventManagement.Domain.Common;
using Microsoft.AspNetCore.Identity;

namespace EventManagement.Infrastructure.Identity;

internal class ApplicationUser : IdentityUser, IHasDomainEvent
{
    [PersonalData]
    public string Name { get; set; } = default!;

    [PersonalData]
    public string? Location { get; set; }

    [PersonalData]
    public DateTime? Birthday { get; set; }

    public string? TimeZone { get; set; }

    public string? Language { get; set; }

    public string? Information { get; set; }

    public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
}
