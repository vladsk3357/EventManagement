namespace EventManagement.Application.Communities.Commands.SubscribeCommunity;

public sealed record FormAnswerDto(ICollection<FormFieldDto> FieldAnswers);

public sealed record FormFieldDto(
    string Name,
    object Value);
