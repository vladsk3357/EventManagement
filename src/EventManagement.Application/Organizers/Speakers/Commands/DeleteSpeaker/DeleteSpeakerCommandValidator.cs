using FluentValidation;

namespace EventManagement.Application.Organizers.Speakers.Commands.DeleteSpeaker;

public sealed class DeleteSpeakerCommandValidator: AbstractValidator<DeleteSpeakerCommand>
{
    public DeleteSpeakerCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id є обов'язковим.");
    }   
}
