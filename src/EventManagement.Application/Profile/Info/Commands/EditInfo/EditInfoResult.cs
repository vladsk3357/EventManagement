namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

public sealed record EditInfoResult(
    string Id, 
    string Email, 
    string? PhoneNumber,
    string Name, 
    string UserName,
    DateOnly? Birthday,
    string? Location,
    string? Information);
