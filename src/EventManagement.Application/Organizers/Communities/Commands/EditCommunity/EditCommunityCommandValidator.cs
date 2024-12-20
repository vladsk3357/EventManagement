﻿using FluentValidation;

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

        RuleFor(x => x.ShortDescription)
            .MaximumLength(400).WithMessage("Максимальна довжина короткого опису 400 символів");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Локація обов'язкова")
            .MaximumLength(100).WithMessage("Максимальна довжина локації 100 символів");

        RuleFor(x => x.Domain)
            .NotEmpty().WithMessage("Домен обов'язковий")
            .MaximumLength(100).WithMessage("Максимальна довжина домену 100 символів");
    }
}
