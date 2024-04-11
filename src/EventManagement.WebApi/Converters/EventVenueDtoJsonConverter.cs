using System.Text.Json;
using System.Text.Json.Serialization;
using EventManagement.Application.Common.Models.Event;
using EventManagement.Domain.Entities.CommunityEvent;

namespace EventManagement.WebApi.Converters;

public class EventVenueDtoJsonConverter : JsonConverter<EventVenueDto>
{
    public override EventVenueDto? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
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
                if (propertyName.Equals(nameof(EventVenueDto.Type), StringComparison.OrdinalIgnoreCase))
                {
                    readerClone.Read();
                    var type = readerClone.GetString();
                    return type switch
                    {
                        EventVenueTypes.Online => JsonSerializer.Deserialize<OnlineEventVenueDto>(ref reader, options),
                        EventVenueTypes.Offline => JsonSerializer.Deserialize<OfflineEventVenueDto>(ref reader, options),
                        _ => throw new NotSupportedException($"Field type '{type}' is not supported.")
                    };
                }
            }
        }

        throw new JsonException();
    }

    public override void Write(Utf8JsonWriter writer, EventVenueDto value, JsonSerializerOptions options)
    {
        writer.WriteRawValue(JsonSerializer.Serialize(value, value.GetType(), options));
    }
}
