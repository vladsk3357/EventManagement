namespace EventManagement.Application.Common.MailTemplateModels;

public sealed record EventCancelledMailTemplateModel(
    string CommunityName,
    string EventName);
