namespace EventManagement.Application.Common.Abilities;

internal abstract class AbilityBase
{
    public abstract AbilityTo Name { get; }

    public abstract bool HasAbility();
}
