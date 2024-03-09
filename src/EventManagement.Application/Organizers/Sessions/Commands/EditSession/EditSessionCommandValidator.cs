using FluentValidation;

namespace EventManagement.Application.Organizers.Sessions.Commands.EditSession;

public sealed class EditSessionCommandValidator : AbstractValidator<EditSessionCommand>
{
    public EditSessionCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();

        RuleFor(x => x.EventId).NotEmpty();

        RuleFor(x => x.Title).NotEmpty();

        RuleFor(x => x.Description).NotEmpty();

        RuleFor(x => x.StartTime).NotEmpty();

        RuleFor(x => x.Duration).NotEmpty();

        RuleFor(x => x.SpeakerIds).NotEmpty();

        RuleFor(x => x.SpeakerIds)
            .Must(x => x is not null && x.All(id => id is not (int)default));
    }
}
