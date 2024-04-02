using EventManagement.Domain.Entities.CommunityEvent;
using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Common;

internal class EventVenueDtoValidator<T> : AbstractValidator<T> where T : EventVenueDto
{
    public EventVenueDtoValidator()
    {
        RuleFor(x => x.Type).NotEmpty().Must(EventVenueTypes.Types.Contains);
    }
}

internal class OnlineVenueDtoValidator : EventVenueDtoValidator<OnlineEventVenueDto>
{
    public OnlineVenueDtoValidator()
    {
        RuleFor(x => x.Url).NotEmpty();
    }
}

internal class OfflineVenueDtoValidator : EventVenueDtoValidator<OfflineEventVenueDto>
{
    public OfflineVenueDtoValidator()
    {
        RuleFor(x => x.Location).NotEmpty();
    }
}
