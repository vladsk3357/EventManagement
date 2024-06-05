using FluentValidation;

namespace EventManagement.Application.Organizers.Communication.Commands.SendCommunityEmail;

public sealed class SendCommunityEmailValidator : AbstractValidator<SendCommunityEmailCommand>
{
    public SendCommunityEmailValidator()
    {
        RuleFor(x => x.CommunityId).NotEmpty();

        RuleFor(x => x.Subject).NotEmpty();

        RuleFor(x => x.Body).NotEmpty();
    }
}
