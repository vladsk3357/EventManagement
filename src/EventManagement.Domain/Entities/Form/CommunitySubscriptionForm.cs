namespace EventManagement.Domain.Entities.Form;

public class CommunitySubscriptionForm
{
    public int Id { get; set; }

    public int CommunityId { get; set; }

    public Community.Community Community { get; set; } = null!;

    public int FormId { get; set; }

    public Form Form { get; set; } = null!;
}
