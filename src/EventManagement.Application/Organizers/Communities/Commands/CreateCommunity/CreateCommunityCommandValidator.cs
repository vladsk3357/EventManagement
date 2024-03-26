using FluentValidation;

namespace EventManagement.Application.Organizers.Communities.Commands.CreateCommunity;

public sealed class CreateCommunityCommandValidator : AbstractValidator<CreateCommunityCommand>
{
    public CreateCommunityCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Назва обов'язкова.")
            .MaximumLength(100).WithMessage("Назва не може бути більше 100 символів.");

        RuleFor(x => x.Domain)
            .NotEmpty().WithMessage("Домен обов'язковий.")
            .MaximumLength(100).WithMessage("Домен не може бути більше 100 символів.");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Локація обов'язкова.")
            .MaximumLength(100).WithMessage("Локація не може бути більше 100 символів.");
    }
}
