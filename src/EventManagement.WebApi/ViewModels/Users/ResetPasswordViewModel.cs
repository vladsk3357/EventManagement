using System.ComponentModel.DataAnnotations;

namespace EventManagement.WebApi.ViewModels.Users;

public sealed class ResetPasswordViewModel
{
    [Required]
    public string Email { get; set; } = default!;

    [Required]
    public string Token { get; set; } = default!;

    [Required]
    public string Password { get; set; } = default!;
}
