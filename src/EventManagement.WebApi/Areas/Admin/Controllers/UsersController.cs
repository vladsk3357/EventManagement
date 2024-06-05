using EventManagement.Application.Admin.Users.Commands.LockUser;
using EventManagement.Application.Admin.Users.Queries.GetUsers;
using EventManagement.WebApi.Areas.Admin.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Areas.Admin.Controllers;

public class UsersController : AdminControllerBase
{
    [HttpGet]
    public async Task<ActionResult<UsersPageViewModel>> Index(int? page, int? pageSize)
    {
        var result = await Mediator.Send(new GetUsersQuery(page ?? 1, pageSize ?? 10));
        return View(result);
    }

    [HttpPost]
    public async Task<IActionResult> Lock(string id, bool isLocked)
    {
        await Mediator.Send(new LockUserCommand(id, isLocked));
        return RedirectToAction(nameof(Index));
    }
}
