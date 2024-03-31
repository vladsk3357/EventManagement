using EventManagement.Domain.Entities.Form;

namespace EventManagement.Domain.Entities;

public class Community : AuditableEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;

    public string Domain { get; set; } = default!;

    public string Location { get; set; } = default!;

    public string OrganizerId { get; set; } = default!;

    public string? ShortDescription { get; set; }

    public string? Description { get; set; }

    public ICollection<Subscription> Subscriptions { get; set; } = default!;

    public CommunitySubscriptionForm SubscriptionForm { get; set; } = default!;

    public ICollection<CommunityForm> Forms { get; set; } = default!;
}
