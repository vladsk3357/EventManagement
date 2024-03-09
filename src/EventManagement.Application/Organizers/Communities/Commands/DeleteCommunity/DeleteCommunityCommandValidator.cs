using FluentValidation;

namespace EventManagement.Application.Organizers.Communities.Commands.DeleteCommunity;

public class DeleteCommunityCommandValidator : AbstractValidator<DeleteCommunityCommand>
{
    public DeleteCommunityCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id є обов'язковим.");
    }
}
