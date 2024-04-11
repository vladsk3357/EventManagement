using EventManagement.Application.Common.Abilities;

namespace EventManagement.Application.Common.Interfaces;

internal interface IAbilitiesService
{
    bool HasAbility(AbilityTo abilityTo);
}
