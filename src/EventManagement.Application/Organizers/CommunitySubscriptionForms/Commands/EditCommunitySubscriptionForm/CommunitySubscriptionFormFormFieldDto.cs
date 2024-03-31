namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Commands.EditCommunitySubscriptionForm;

public sealed record CommunitySubscriptionFormFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    FieldTypeSpecificProperties? Properties);

public sealed record FieldTypeSpecificProperties(ICollection<string> Options);
