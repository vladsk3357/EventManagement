namespace EventManagement.Application.Common.MailTemplateModels;

public sealed record InvitationToCommunityMailTemplateModel(
    string CommunityName,
    string CommunityUrl);
