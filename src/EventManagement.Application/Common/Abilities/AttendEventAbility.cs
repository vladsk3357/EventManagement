namespace EventManagement.Application.Common.Abilities;

internal sealed class AttendEventAbility : AbilityBase
{
    private readonly ICurrentUserService _currentUserService;

    public AttendEventAbility(ICurrentUserService currentUserService)
    {
        _currentUserService = currentUserService;
    }

    public override AbilityTo Name => AbilityTo.AttendEvent;

    public override bool HasAbility() 
        => _currentUserService.UserId is not null;
}
