namespace EventManagement.Domain.Entities;

public class User : AuditableEntity, IHasDomainEvent
{
    public string Id { get; set; } = default!;

    public required string Email { get; set; }

    public string UserName { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string? PhoneNumber { get; set; }

    public string? Location { get; set; }

    public DateOnly? Birthday { get; set; }

    public string? TimeZone { get; set; }

    public string? Language { get; set; }

    public string? Information { get; set; }

    public List<DomainEvent> DomainEvents { get; set; } = new();
}
