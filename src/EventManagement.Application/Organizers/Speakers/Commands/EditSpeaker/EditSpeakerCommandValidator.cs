using FluentValidation;

namespace EventManagement.Application.Organizers.Speakers.Commands.EditSpeaker;

public sealed class EditSpeakerCommandValidator : AbstractValidator<EditSpeakerCommand>
{
    public EditSpeakerCommandValidator()
    {
        
    }
}
