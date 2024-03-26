using FluentValidation;

namespace EventManagement.Application.Organizers.Communities.Commands.EditCommunity;

public sealed class EditCommunityCommandValidator : AbstractValidator<EditCommunityCommand>
{
    public EditCommunityCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id обов'язкове");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Назва обов'язкова")
            .MaximumLength(100).WithMessage("Максимальна довжина назви 100 символів");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Опис обов'язковий")
            .MaximumLength(500).WithMessage("Максимальна довжина опису 500 символів");

        RuleFor(x => x.ShortDescription)
            .MaximumLength(100).WithMessage("Максимальна довжина короткого опису 100 символів");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Локація обов'язкова")
            .MaximumLength(100).WithMessage("Максимальна довжина локації 100 символів");

        RuleFor(x => x.Domain)
            .NotEmpty().WithMessage("Домен обов'язковий")
            .MaximumLength(100).WithMessage("Максимальна довжина домену 100 символів");
    }
}
