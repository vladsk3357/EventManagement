using System.Text.Json.Serialization;
using EventManagement.Domain.Entities.Form.FormField;

namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionFormAnswerDetails;

[JsonDerivedType(typeof(ShortTextFormFieldAnswerDto), typeDiscriminator: FormFieldNames.ShortText)]
[JsonDerivedType(typeof(LongTextFormFieldAnswerDto), typeDiscriminator: FormFieldNames.LongText)]
[JsonDerivedType(typeof(SingleOptionFormFieldAnswerDto), typeDiscriminator: FormFieldNames.SingleOption)]
[JsonDerivedType(typeof(MultipleOptionsFormFieldAnswerDto), typeDiscriminator: FormFieldNames.MultipleOptions)]
public record FormFieldAnswerDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    object Value);

public record ShortTextFormFieldAnswerDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    object Value) : FormFieldAnswerDto(
    Name,
    Description,
    IsRequired,
    Type,
    Order,
    Value);

public record LongTextFormFieldAnswerDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    object Value) : FormFieldAnswerDto(
    Name,
    Description,
    IsRequired,
    Type,
    Order,
    Value);

public sealed record SingleOptionFormFieldAnswerDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    object Value,
    ICollection<string> Options) : FormFieldAnswerDto(
        Name,
        Description,
        IsRequired,
        Type,
        Order,
        Value);

public sealed record MultipleOptionsFormFieldAnswerDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    object Value,
    ICollection<string> Options) : FormFieldAnswerDto(
        Name,
        Description,
        IsRequired,
        Type,
        Order,
        Value);
