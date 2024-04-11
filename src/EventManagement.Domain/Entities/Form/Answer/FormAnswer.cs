namespace EventManagement.Domain.Entities.Form.Answer;

public class FormAnswer : AuditableEntity
{
    public int Id { get; set; }

    public int FormId { get; set; }

    public Form Form { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public List<FormFieldAnswer> FieldAnswers { get; set; } = [];
}
