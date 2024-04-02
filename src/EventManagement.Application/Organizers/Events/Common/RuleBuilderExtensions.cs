using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Common;

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

    public static IRuleBuilderOptions<T, AttendanceDto> IsValid<T>(this IRuleBuilder<T, AttendanceDto> ruleBuilder)
    {
        return ruleBuilder.NotEmpty().SetValidator(new AttendanceDtoValidator());
    }
}
