namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionForm;

public sealed record GetCommunitySubscriptionFormDto(
    int CommunityId,
    IReadOnlyList<GetCommunitySubscriptionFormFormFieldDto> Fields);

public sealed record GetCommunitySubscriptionFormFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    FieldTypeSpecificProperties? Properties);

public sealed record FieldTypeSpecificProperties(ICollection<string>? Options);
