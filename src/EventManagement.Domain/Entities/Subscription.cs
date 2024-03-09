namespace EventManagement.Domain.Entities;

public class Subscription : AuditableEntity
{
    public int Id { get; set; }

    public int CommunityId { get; set; } = default!;

    public Community Community { get; set; } = default!;

    public string UserId { get; set; } = default!;
}
