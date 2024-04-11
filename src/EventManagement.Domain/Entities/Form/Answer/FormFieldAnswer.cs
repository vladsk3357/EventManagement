using EventManagement.Domain.Entities.Form.FormField;

namespace EventManagement.Domain.Entities.Form.Answer;

public class FormFieldAnswer
{
    public FormFieldBase FormField { get; set; } = null!;

    public object Value { get; set; } = null!;
}
