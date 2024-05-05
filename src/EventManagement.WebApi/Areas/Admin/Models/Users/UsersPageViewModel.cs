using EventManagement.WebApi.Areas.Admin.Models.Common;

namespace EventManagement.WebApi.Areas.Admin.Models.Users;

public class UsersPageViewModel
{
    public PagedViewModel<UserViewModel> Users { get; set; } = null!;
}
