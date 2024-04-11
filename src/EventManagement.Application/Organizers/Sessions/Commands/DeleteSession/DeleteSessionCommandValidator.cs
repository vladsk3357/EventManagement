using FluentValidation;

namespace EventManagement.Application.Organizers.Sessions.Commands.DeleteSession;

public sealed class DeleteSessionCommandValidator : AbstractValidator<DeleteSessionCommand>
{
    public DeleteSessionCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
