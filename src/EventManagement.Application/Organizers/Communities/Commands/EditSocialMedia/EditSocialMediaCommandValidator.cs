using FluentValidation;

namespace EventManagement.Application.Organizers.Communities.Commands.EditSocialMedia;

public sealed class EditSocialMediaCommandValidator : AbstractValidator<EditSocialMediaCommand>
{
    public EditSocialMediaCommandValidator()
    {
        RuleFor(x => x.WebsiteUrl)
            .MaximumLength(200)
            .WithMessage("Website link must not exceed 200 characters.");

        RuleFor(x => x.FacebookUrl)
            .MaximumLength(200)
            .WithMessage("Facebook link must not exceed 200 characters.");

        RuleFor(x => x.InstagramUrl)
            .MaximumLength(200)
            .WithMessage("Instagram link must not exceed 200 characters.");

        RuleFor(x => x.TwitterUrl)
            .MaximumLength(200)
            .WithMessage("Twitter link must not exceed 200 characters.");

        RuleFor(x => x.LinkedInUrl)
            .MaximumLength(200)
            .WithMessage("LinkedIn link must not exceed 200 characters.");

        RuleFor(x => x.YouTubeUrl)
            .MaximumLength(200)
            .WithMessage("YouTube link must not exceed 200 characters.");

        RuleFor(x => x.TikTokUrl)
            .MaximumLength(200)
            .WithMessage("TikTok link must not exceed 200 characters.");

        RuleFor(x => x.TelegramUrl)
            .MaximumLength(200)
            .WithMessage("Telegram link must not exceed 200 characters.");

        RuleFor(x => x.TwitchUrl)
            .MaximumLength(200)
            .WithMessage("Twitch link must not exceed 200 characters.");

        RuleFor(x => x.DiscordUrl)
            .MaximumLength(200)
            .WithMessage("Discord link must not exceed 200 characters.");

        RuleFor(x => x.SlackUrl)
            .MaximumLength(200)
            .WithMessage("Slack link must not exceed 200 characters.");

        RuleFor(x => x.MediumUrl)
            .MaximumLength(200)
            .WithMessage("Medium link must not exceed 200 characters.");
    }
}
