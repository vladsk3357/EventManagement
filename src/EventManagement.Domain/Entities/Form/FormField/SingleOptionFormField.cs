namespace EventManagement.Domain.Entities.Form.FormField;

public class SingleOptionFormField : FormFieldBase
{
    public override string Type => FormFieldNames.SingleOption;

    public ICollection<string> Options { get; set; } = [];

    public override bool Validate(object value)
    {
        var str = value.ToString();

        if (IsRequired && string.IsNullOrWhiteSpace(str))
            return false;

        if ((IsRequired || !string.IsNullOrWhiteSpace(str)) && !Options.Contains(str))
            return false;

        return true;
    }
}
