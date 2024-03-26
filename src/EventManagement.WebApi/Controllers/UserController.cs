using EventManagement.Application.Profile.User.Commands.ConfirmEmail;
using EventManagement.Application.Profile.User.Commands.ResetPassword;
using EventManagement.WebApi.ViewModels.Users;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

public class UserController : Controller
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Confirmation(ConfirmEmailCommand command)
    {
        var result = await _mediator.Send(command);
        return View(result);
    }

    [HttpGet]
    public IActionResult ResetPassword(string token, string email)
    {
        var model = new ResetPasswordViewModel { Token = token, Email = email };
        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
    {
        if (ModelState.IsValid)
        {
            var command = new ResetPasswordCommand(model.Email, model.Token, model.Password);
            if (await _mediator.Send(command))
                return RedirectToAction(nameof(ResetPasswordSuccess));
            //else
            //    ModelState.AddModelError("", result.Errors.First().Message);
        }
        
        return View(model);
    }

    [HttpGet]
    public IActionResult ResetPasswordSuccess()
    {
        return View();
    }
}
