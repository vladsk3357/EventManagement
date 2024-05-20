namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

public sealed record EditInfoResult(
    string Id, 
    string Email, 
    string Name, 
    string UserName,
    string? Location,
    string? Information,
    string? ProfileImageUrl);
