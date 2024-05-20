namespace EventManagement.Application.Admin.Users.Queries.GetUsers;

public sealed record UserDto(string Id, string Name, string Email, bool IsLocked);

