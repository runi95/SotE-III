import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class Redemption implements DamageEvent {
    private readonly abilityId: number = FourCC('A034');

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId);

        if (abilityLevel < 1) {
            return;
        }

        if (GetRandomInt(0, 100) < 5 + 2 * abilityLevel) {
            const intelligence: number = GetHeroInt(globals.DamageEventTarget as unit, true);
            const healing: number = 75 * abilityLevel + 1.5 * intelligence;
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\Heal\\HealTarget.mdl',
                                           GetUnitX(globals.DamageEventTarget as unit), GetUnitY(globals.DamageEventTarget as unit)));
            SetUnitLifeBJ(globals.DamageEventTarget as unit,
                          GetUnitStateSwap(UNIT_STATE_LIFE, globals.DamageEventTarget as unit) + healing);
        }
    }
}
