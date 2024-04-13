using FluentValidation;

namespace EventManagement.Application.Organizers.Communication.Commands.SendEventEmail;

public sealed class SendEventEmailCommandValidator : AbstractValidator<SendEventEmailCommand>
{
    public SendEventEmailCommandValidator()
    {
        RuleFor(x => x.EventId).NotEmpty();

        RuleFor(x => x.Subject).NotEmpty();

        RuleFor(x => x.Body).NotEmpty();

        RuleFor(x => x.ToPending)
            .Must((command, x) => x || command.ToConfirmed)
            .WithMessage("At least one of ToPending or ToConfirmed must be true");

        RuleFor(x => x.ToConfirmed)
              .Must((command, x) => x || command.ToPending)
              .WithMessage("At least one of ToPending or ToConfirmed must be true");
    }
}
