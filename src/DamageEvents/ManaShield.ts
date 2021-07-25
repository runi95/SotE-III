import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class ManaShield implements DamageEvent {
    private readonly buffId: number = FourCC('BNms');

    public event(globals: DamageEngineGlobals): void {
        if (UnitHasBuffBJ(globals.DamageEventTarget as unit, this.buffId)) {
            const currentMana: number = GetUnitState(globals.DamageEventTarget as unit, UNIT_STATE_MANA);
            const newDamageAmount = globals.DamageEventAmount - Math.min(globals.DamageEventAmount, currentMana);
            const newManaAmount: number = currentMana + newDamageAmount - globals.DamageEventAmount;
            globals.DamageEventAmount = newDamageAmount;

            SetUnitManaBJ(globals.DamageEventTarget as unit, newManaAmount);

            if (newDamageAmount > 0) {
                IssueImmediateOrderBJ(globals.DamageEventTarget as unit, 'manashieldoff');
            }
        }
    }
}
