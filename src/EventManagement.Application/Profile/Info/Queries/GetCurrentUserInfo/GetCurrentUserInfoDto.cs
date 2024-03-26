namespace EventManagement.Application.Profile.Info.Queries.GetCurrentUserInfo;

public sealed record GetCurrentUserInfoDto(
    string Id, 
    string Email,
    string? PhoneNumber,
    string Name, 
    string UserName,
    DateOnly? Birthday,
    string? Location,
    string? Information);
