using FluentValidation;

namespace EventManagement.Application.Organizers.Speakers.Commands.CreateSpeaker;

public sealed class CreateSpeakerCommandValidator: AbstractValidator<CreateSpeakerCommand>
{
    public CreateSpeakerCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Ім'я обов'язкове")
            .MinimumLength(3).WithMessage("Мінімальна довжина імені 3 символи")
            .MaximumLength(100).WithMessage("Максимальна довжина імені 100 символів");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Посада обов'язкова")
            .MinimumLength(3).WithMessage("Мінімальна довжина посади 3 символи")
            .MaximumLength(100).WithMessage("Максимальна довжина посади 100 символів");

        RuleFor(x => x.Company)
            .NotEmpty().WithMessage("Компанія обов'язкова")
            .MinimumLength(3).WithMessage("Мінімальна довжина компанії 3 символи")
            .MaximumLength(100).WithMessage("Максимальна довжина компанії 100 символів");

        RuleFor(x => x.Bio)
            .NotEmpty().WithMessage("Біографія обов'язкова")
            .MinimumLength(3).WithMessage("Мінімальна довжина біографії 3 символи")
            .MaximumLength(500).WithMessage("Максимальна довжина біографії 500 символів");

        RuleFor(x => x.EventId)
            .NotEmpty().WithMessage("Подія обов'язкова");
    }
}
