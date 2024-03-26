namespace EventManagement.Application.Common.Models.User;

public sealed record class RegisterUserResult(bool Success, string? Error = null, Domain.Entities.User? User = null);
