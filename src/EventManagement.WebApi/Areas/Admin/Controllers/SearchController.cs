using EventManagement.Application.Admin.Search.Command;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Areas.Admin.Controllers;

public class SearchController : AdminControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Reindex()
    {
        await Mediator.Send(new ReindexCommand());
        return RedirectToAction("Index", "Home");
    }
}
