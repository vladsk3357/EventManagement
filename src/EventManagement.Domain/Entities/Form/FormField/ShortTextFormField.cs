namespace EventManagement.Domain.Entities.Form.FormField;

public class ShortTextFormField : FormFieldBase
{
    public override string Type => FormFieldNames.ShortText;

    public override bool Validate(object value)
    {
        var str = value.ToString();
        return !IsRequired || !string.IsNullOrWhiteSpace(str);
    }
}
