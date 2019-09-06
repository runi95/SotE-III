import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class ManaShield implements DamageEvent {
    private readonly abilityId: number = FourCC('A000');
    private readonly buffId: number = FourCC('BNms');

    public event(globals: DamageEngineGlobals): void {
        if (UnitHasBuffBJ(globals.DamageEventTarget as unit, this.buffId)) {
            const shieldLevel: number = GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId);
            const damageReductionPercentage: number = 0.5 + shieldLevel * 0.02;
            const damageReduction: number = globals.DamageEventAmount * damageReductionPercentage;
            const newDamageAmount: number = globals.DamageEventAmount - damageReduction;
            const currentMana: number = GetUnitState(globals.DamageEventTarget as unit, UNIT_STATE_MANA);
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
