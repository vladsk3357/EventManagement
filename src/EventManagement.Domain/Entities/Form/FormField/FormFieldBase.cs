using System.Text.Json.Serialization;

namespace EventManagement.Domain.Entities.Form.FormField;

[JsonDerivedType(typeof(ShortTextFormField), typeDiscriminator: FormFieldNames.ShortText)]
[JsonDerivedType(typeof(LongTextFormField), typeDiscriminator: FormFieldNames.LongText)]
[JsonDerivedType(typeof(SingleOptionFormField), typeDiscriminator: FormFieldNames.SingleOption)]
[JsonDerivedType(typeof(MultipleOptionsFormField), typeDiscriminator: FormFieldNames.MultipleOptions)]
public abstract class FormFieldBase
{
    public abstract string Type { get; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsRequired { get; set; }

    public int Order { get; set; }

    public abstract bool Validate(object value);
}
