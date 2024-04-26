namespace EventManagement.Domain.Entities;

public class User : AuditableEntity, IHasDomainEvent
{
    public string Id { get; set; } = default!;

    public string Email { get; set; } = default!;

    public string UserName { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string? Location { get; set; }

    public string? Information { get; set; }

    public string? ProfileImage { get; set; }

    public List<DomainEvent> DomainEvents { get; set; } = new();
}
