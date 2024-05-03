using System.ComponentModel.DataAnnotations;

namespace EventManagement.WebApi.Areas.Admin.Models.Account;

public class LogInViewModel
{
    [Display(Name = "Електронна пошта")]
    [Required(ErrorMessage = "Електронна пошта обов'язкова", AllowEmptyStrings = false)]
    [EmailAddress(ErrorMessage = "Значення має бути валідною електронною поштою")]
    public string Email { get; set; }

    [Display(Name = "Пароль")]
    [Required(ErrorMessage = "Пароль є обов'язковим", AllowEmptyStrings = false)]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}
