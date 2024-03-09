namespace EventManagement.Domain.Entities;

public class Speaker: AuditableEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;

    public string Title { get; set; } = default!;

    public string Company { get; set; } = default!;

    public string Bio { get; set; } = default!;

    public int EventId { get; set; } = default!;

    public Event Event { get; set; } = default!;
}
