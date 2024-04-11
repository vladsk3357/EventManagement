namespace EventManagement.Application.Profile.Info.Queries.GetCurrentUserInfo;

internal static class GetCurrentUserInfoMapper
{
    public static GetCurrentUserInfoDto ToDto(this Domain.Entities.User user) => new(
        user.Id, 
        user.Email,
        user.Name, 
        user.UserName, 
        user.Location,
        user.Information);
}
