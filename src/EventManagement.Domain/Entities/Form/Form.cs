using EventManagement.Domain.Entities.Form.Answer;
using EventManagement.Domain.Entities.Form.FormField;

namespace EventManagement.Domain.Entities.Form;

public class Form : AuditableEntity
{
    public int Id { get; set; }

    public string? Name { get; set; } = null!;

    public FormType Type { get; set; }

    public List<FormFieldBase> Fields { get; } = [];

    public ICollection<FormAnswer> Answers { get; } = [];

    public CommunityForm? CommunityForm { get; set; } = null;

    public EventAttendanceForm? EventAttendanceForm { get; set; } = null;

    public CommunitySubscriptionForm? CommunitySubscriptionForm { get; set; } = null;
}

public enum FormType
{
    CommunitySubscription = 0,
    EventAttendanceForm = 1,
    CommunityForm = 2
}
