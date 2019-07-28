import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class ManaShield implements DamageEvent {
    private readonly abilityId: number = FourCC('A000');
    private readonly buffId: number = FourCC('BNms');

    public event(globals: DamageEngineGlobals): void {
        if (UnitHasBuffBJ(globals.DamageEventTarget as unit, this.buffId)) {
            const shieldLevel: number = GetUnitAbilityLevelSwapped(this.abilityId, globals.DamageEventTarget as unit);
            const damageReductionPercentage: number = 0.50 + shieldLevel * 0.02;
            const damageReduction: number = globals.DamageEventAmount * damageReductionPercentage;
            const newDamageAmount: number = globals.DamageEventAmount - damageReduction;
            const currentMana: number = GetUnitStateSwap(UNIT_STATE_MANA, globals.DamageEventTarget as unit);
            const newManaAmount: number = currentMana - damageReduction;
            globals.DamageEventAmount = newDamageAmount;

            if (newManaAmount < 1) {
                IssueImmediateOrderBJ(globals.DamageEventTarget as unit, 'manashieldoff');
                SetUnitManaBJ(globals.DamageEventTarget as unit, 0);
            } else {
                SetUnitManaBJ(globals.DamageEventTarget as unit, newManaAmount);
            }
        }
    }
}
