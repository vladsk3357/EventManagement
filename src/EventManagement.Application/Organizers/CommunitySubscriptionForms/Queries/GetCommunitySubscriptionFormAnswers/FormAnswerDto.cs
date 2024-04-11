namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionFormAnswers;

public sealed record FormAnswerDto(
    int Id,
    string UserId,
    string UserName,
    string Name,
    DateTime AnswerDate);
