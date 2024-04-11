namespace EventManagement.Domain.Entities.Form.FormField;

public class LongTextFormField : FormFieldBase
{
    public override string Type => FormFieldNames.LongText;

    public override bool Validate(object value)
    {
        var str = value.ToString();
        return !IsRequired || !string.IsNullOrWhiteSpace(str);
    }
}
