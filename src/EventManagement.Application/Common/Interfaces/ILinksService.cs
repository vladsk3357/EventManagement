namespace EventManagement.Application.Common.Interfaces;

public interface ILinksService
{
    string GenerateEmailConfirmationLink(string token, string email);
    string GenerateResetPasswordLink(string token, string email);
}
