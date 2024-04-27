namespace EventManagement.Application.Profile.Info.Queries.GetCurrentUserInfo;

public sealed record GetCurrentUserInfoDto(
    string Id, 
    string Email,
    string Name, 
    string UserName,
    string? Location,
    string? Information,
    string? ProfileImageUrl);
