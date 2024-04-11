using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Commands.DeleteEvent;

public sealed class DeleteEventCommandValidator : AbstractValidator<DeleteEventCommand>
{
    public DeleteEventCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
