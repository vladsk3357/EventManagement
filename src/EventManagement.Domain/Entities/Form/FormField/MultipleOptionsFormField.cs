using System.Text.Json;

namespace EventManagement.Domain.Entities.Form.FormField;

public class MultipleOptionsFormField : FormFieldBase
{
    public override string Type => FormFieldNames.MultipleOptions;

    public ICollection<string> Options { get; set; } = [];

    public override bool Validate(object value)
    {
        var values = value switch
        {
            string str => [str],
            JsonElement json => json.EnumerateArray().Select(x => x.GetString() ?? string.Empty),
            IEnumerable<string> enumerable => enumerable,
            _ => throw new ArgumentException("Invalid value type")
        };

        if (IsRequired && !values.Any())
            return false;

        if ((IsRequired || values.Any()) && !values.All(Options.Contains))
            return false;

        return true;
    }
}
