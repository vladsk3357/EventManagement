namespace EventManagement.Application.Profile.Info.Queries.GetShortInfo;

public class ProfileInfoDto
{
    public string Id { get; set; } = default!;

    public string Email { get; set; } = default!;

    public string UserName { get; set; } = default!;

    public string Name { get; set; } = default!;

    //public string? PhoneNumber { get; set; }

    public string? Location { get; set; }

    //public DateOnly? Birthday { get; set; }

    //public string? TimeZone { get; set; }

    //public string? Language { get; set; }

    //public string? Information { get; set; }
}
