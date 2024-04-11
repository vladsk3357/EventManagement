using EventManagement.Application.Common.Interfaces;

namespace EventManagement.Application.Common.Abilities;

internal sealed class AbilitiesService : IAbilitiesService
{
    private readonly IEnumerable<AbilityBase> _abilities;

    public AbilitiesService(IEnumerable<AbilityBase> abilities)
    {
        _abilities = abilities;
    }

    public bool HasAbility(AbilityTo abilityTo)
    {
        var ability = _abilities.FirstOrDefault(a => a.Name == abilityTo);

        return ability is null 
            ? throw new ArgumentException($"Ability {abilityTo} is not registered.") 
            : ability.HasAbility();
    }
}
