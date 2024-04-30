using EventManagement.Application.Common.Models.Event;
using FluentValidation;

namespace EventManagement.Application.Common.Models.Event;

internal static class RuleBuilderExtensions
{
    public static IRuleBuilderOptions<T, EventVenueDto> IsValid<T>(this IRuleBuilder<T, EventVenueDto> ruleBuilder)
    {
       return ruleBuilder.SetInheritanceValidator(x =>
       {
           x.Add(new OnlineVenueDtoValidator());
           x.Add(new OfflineVenueDtoValidator());
       });
    }

    public static IRuleBuilderOptions<T, AddressDto> IsValid<T>(this IRuleBuilder<T, AddressDto> ruleBuilder)
    {
        return ruleBuilder.ChildRules(address =>
        {
            address.RuleFor(x => x.City).NotEmpty();
            address.RuleFor(x => x.Street).NotEmpty();
            address.RuleFor(x => x.LocationName).NotEmpty();
        });
    }
}
