using FluentValidation;

namespace EventManagement.Application.Organizers.Speakers.Commands.CreateSpeaker;

public sealed class CreateSpeakerCommandValidator: AbstractValidator<CreateSpeakerCommand>
{
    public CreateSpeakerCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Ім'я обов'язкове")
            .MaximumLength(100).WithMessage("Максимальна довжина імені 100 символів");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Посада обов'язкова")
            .MaximumLength(100).WithMessage("Максимальна довжина посади 100 символів");

        RuleFor(x => x.Company)
            .NotEmpty().WithMessage("Компанія обов'язкова")
            .MaximumLength(100).WithMessage("Максимальна довжина компанії 100 символів");

        RuleFor(x => x.Bio)
            .NotEmpty().WithMessage("Біографія обов'язкова")
            .MaximumLength(500).WithMessage("Максимальна довжина біографії 500 символів");

        RuleFor(x => x.EventId)
            .NotEmpty().WithMessage("Подія обов'язкова");
    }
}
