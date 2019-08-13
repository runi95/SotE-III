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

    private dealCriticalDamage(globals: DamageEngineGlobals): void {
        const dmg: number = globals.DamageEventAmount * 2.00
        const sourceLoc: location = GetUnitLoc(globals.DamageEventSource as unit);
        const txt: texttag = CreateTextTagLocBJ(I2S(R2I(dmg)), sourceLoc, 1, 10, 100.00, 0.00, 0.00, 0.00);
        globals.DamageEventAmount = dmg;
        SetTextTagPermanentBJ(txt, false);
        SetTextTagLifespanBJ(txt, 2.00);
        SetTextTagVelocityBJ(txt, 64, 90);

        RemoveLocation(sourceLoc);
    }
}
