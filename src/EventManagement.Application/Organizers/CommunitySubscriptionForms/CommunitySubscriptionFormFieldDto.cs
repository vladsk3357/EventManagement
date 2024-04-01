namespace EventManagement.Application.Organizers.CommunitySubscriptionForms;

public abstract record CommunitySubscriptionFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order);

public sealed record ShortTextFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order) : CommunitySubscriptionFormFieldDto(Name, Description, IsRequired, Type, Order);

public sealed record LongTextFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order) : CommunitySubscriptionFormFieldDto(Name, Description, IsRequired, Type, Order);

public sealed record SingleOptionFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    ICollection<string> Options) : CommunitySubscriptionFormFieldDto(Name, Description, IsRequired, Type, Order);

public sealed record MultipleOptionsFormFieldDto(
    string Name,
    string? Description,
    bool IsRequired,
    string Type,
    int Order,
    ICollection<string> Options) : CommunitySubscriptionFormFieldDto(Name, Description, IsRequired, Type, Order);