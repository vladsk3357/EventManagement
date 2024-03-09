namespace EventManagement.Domain.Entities;

public class UserInfo : AuditableEntity, IHasDomainEvent
{
    public required string Id { get; init; }

    public required string Name { get; set; }

    public string? PhoneNo { get; set; }

    public string? Location { get; set; }

    public DateOnly? Birthday { get; set; }

    public string? TimeZone { get; set; }

    public string? Language { get; set; }

    public string? Information { get; set; }

    public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
}
