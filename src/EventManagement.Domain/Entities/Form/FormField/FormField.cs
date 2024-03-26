namespace EventManagement.Domain.Entities.Form.FormField;

public abstract class FormField
{
    public abstract string FieldType { get; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsRequired { get; set; }

    public int Order { get; set; }

    public abstract bool Validate(object value);
}
