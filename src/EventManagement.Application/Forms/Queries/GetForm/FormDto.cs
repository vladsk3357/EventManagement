using System.Text.Json.Serialization;
using EventManagement.Domain.Entities.Form.FormField;

namespace EventManagement.Application.Forms.Queries.GetForm;

public sealed record FormDto(int Id, IReadOnlyCollection<FormFieldDto> Fields);

//public sealed record FormFieldDto(
//    string Name,
//    string? Description,
//    bool IsRequired,
//    string Type,
//    int Order,
//    FieldTypeSpecificProperties? Properties);

[JsonDerivedType(typeof(ShortTextFormFieldDto), typeDiscriminator: FormFieldNames.ShortText)]
[JsonDerivedType(typeof(LongTextFormFieldDto), typeDiscriminator: FormFieldNames.LongText)]
[JsonDerivedType(typeof(SingleOptionFormFieldDto), typeDiscriminator: FormFieldNames.SingleOption)]
[JsonDerivedType(typeof(MultipleOptionsFormFieldDto), typeDiscriminator: FormFieldNames.MultipleOptions)]
public record FormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order);

public record ShortTextFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order) : FormFieldDto(
    Name,
    Description,
    IsRequired,
    Type,
    Order);

public record LongTextFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order) : FormFieldDto(
    Name,
    Description,
    IsRequired,
    Type,
    Order);

public sealed record SingleOptionFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    ICollection<string> Options) : FormFieldDto(
        Name,
        Description,
        IsRequired,
        Type,
        Order);

public sealed record MultipleOptionsFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    ICollection<string> Options) : FormFieldDto(
        Name,
        Description,
        IsRequired,
        Type,
        Order);

//public sealed record FieldTypeSpecificProperties(ICollection<string>? Options);
