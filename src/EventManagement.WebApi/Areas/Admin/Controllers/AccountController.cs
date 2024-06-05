using EventManagement.Application.Admin.Account.Commands.Login;
using EventManagement.WebApi.Areas.Admin.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Areas.Admin.Controllers;

[AllowAnonymous]
public class AccountController : AdminControllerBase
{
    [HttpGet]
    public IActionResult LogIn(string? returnUrl)
    {
        ViewBag.ReturnUrl = returnUrl;
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> LogIn(LogInViewModel loginViewModel, string? returnUrl)
    {
        if (!ModelState.IsValid)
            return View(loginViewModel);

        var request = new LogInCommand(loginViewModel.Email, loginViewModel.Password);

        if (await Mediator.Send(request))
        {
            return !string.IsNullOrEmpty(returnUrl) 
                ? Redirect(returnUrl) 
                : RedirectToAction("Index", "Home");
        }

        ModelState.AddModelError(nameof(LogInViewModel.Email), "Не валідна електронна пошта або пароль.");
        return View(loginViewModel);
    }
}
