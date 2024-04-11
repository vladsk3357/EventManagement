namespace EventManagement.Application.Profile.Info.Queries.GetShortInfo;

internal static class GetShortInfoQueryMapper
{
    public static ProfileInfoDto ToDto(this Domain.Entities.User user) => new()
    {
        Id = user.Id,
        Email = user.Email,
        UserName = user.UserName,
        Name = user.Name,
        //PhoneNumber = user.PhoneNumber,
        Location = user.Location,
        //Birthday = user.Birthday,
        //TimeZone = user.TimeZone,
        //Language = user.Language,
        //Information = user.Information
    };
}
