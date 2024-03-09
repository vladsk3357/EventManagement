namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

internal static class EditInfoCommandMapper
{
    public static Domain.Entities.User ToEntity(this EditInfoCommand command) => new()
    {
        Name = command.Name,
        UserName = command.UserName,
        Email = command.Email,
        PhoneNumber = command.PhoneNumber,
        Location = command.Location,
        Birthday = command.Birthday,
        Information = command.Information
    };

    public static EditInfoResult ToDto(this Domain.Entities.User user) => new(
        user.Id, 
        user.Email, 
        user.PhoneNumber, 
        user.Name, 
        user.UserName, 
        user.Birthday, 
        user.Location, 
        user.Information);
}
