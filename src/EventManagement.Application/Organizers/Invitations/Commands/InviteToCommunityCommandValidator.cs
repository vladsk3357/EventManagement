using FluentValidation;

namespace EventManagement.Application.Organizers.Invitations.Commands;

public sealed class InviteToCommunityCommandValidator : AbstractValidator<InviteToCommunityCommand>
{
    public InviteToCommunityCommandValidator()
    {
        RuleFor(x => x.Emails)
            .ForEach(x => x.NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Email is not valid."));

        RuleFor(x => x.CommunityId)
            .NotEmpty().WithMessage("Community ID is required.");
    }
}
