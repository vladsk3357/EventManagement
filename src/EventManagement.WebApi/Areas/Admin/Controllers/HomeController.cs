using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Areas.Admin.Controllers;

public class HomeController : AdminControllerBase
{
    public IActionResult Index()
    {
        return View();
    }
}
