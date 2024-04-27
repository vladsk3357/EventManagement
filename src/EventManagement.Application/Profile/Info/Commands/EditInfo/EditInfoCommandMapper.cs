namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

internal static class EditInfoCommandMapper
{
    public static Domain.Entities.User ToEntity(this EditInfoCommand command) => new()
    {
        Name = command.Name,
        UserName = command.UserName,
        Location = command.Location,
        Information = command.Information
    };

    public static EditInfoResult ToDto(this Domain.Entities.User user, string? profileImageUrl) => new(
        user.Id, 
        user.Email, 
        user.Name, 
        user.UserName, 
        user.Location, 
        user.Information,
        profileImageUrl);
}
