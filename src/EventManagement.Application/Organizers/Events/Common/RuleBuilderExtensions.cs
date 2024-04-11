using EventManagement.Application.Common.Models.Event;
using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Common;

internal static class RuleBuilderExtensions
{
    public static IRuleBuilderOptions<T, AttendanceDto> IsValid<T>(this IRuleBuilder<T, AttendanceDto> ruleBuilder)
    {
        return ruleBuilder.NotEmpty().SetValidator(new AttendanceDtoValidator());
    }
}
