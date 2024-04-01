using System.Text.Json;
using System.Text.Json.Serialization;
using EventManagement.Application.Organizers.CommunitySubscriptionForms;
using EventManagement.Domain.Entities.Form.FormField;

namespace EventManagement.WebApi.Converters;

public class CommunitySubscriptionFormFieldDtoJsonConverter : JsonConverter<CommunitySubscriptionFormFieldDto>
{
    public override CommunitySubscriptionFormFieldDto? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        Utf8JsonReader readerClone = reader;

        if (readerClone.TokenType != JsonTokenType.StartObject)
        {
            throw new JsonException();
        }

        while (readerClone.Read())
        {
            if (readerClone.TokenType == JsonTokenType.EndObject)
            {
                throw new JsonException();
            }

            if (readerClone.TokenType == JsonTokenType.PropertyName)
            {
                var propertyName = readerClone.GetString() ?? throw new JsonException();
                if (propertyName.Equals(nameof(CommunitySubscriptionFormFieldDto.Type), StringComparison.OrdinalIgnoreCase))
                {
                    readerClone.Read();
                    var type = readerClone.GetString();
                    return type switch
                    {
                        FormFieldNames.ShortText => JsonSerializer.Deserialize<ShortTextFormFieldDto>(ref reader, options),
                        FormFieldNames.LongText => JsonSerializer.Deserialize<LongTextFormFieldDto>(ref reader, options),
                        FormFieldNames.SingleOption => JsonSerializer.Deserialize<SingleOptionFormFieldDto>(ref reader, options),
                        FormFieldNames.MultipleOptions => JsonSerializer.Deserialize<MultipleOptionsFormFieldDto>(ref reader, options),
                        _ => throw new NotSupportedException($"Field type '{type}' is not supported.")
                    };
                }
            }
        }

        throw new JsonException();
    }

    public override void Write(Utf8JsonWriter writer, CommunitySubscriptionFormFieldDto value, JsonSerializerOptions options)
    {
        writer.WriteRawValue(JsonSerializer.Serialize(value, value.GetType(), options));
    }
}
