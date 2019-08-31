import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class ManaBrilliance implements DamageEvent {
    private readonly unitTypeId: number = FourCC('N000');

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (GetUnitTypeId(globals.DamageEventSource as unit) !== this.unitTypeId) {
            return;
        }

        SetUnitManaBJ(globals.DamageEventSource as unit,
                      GetUnitState(globals.DamageEventSource as unit, UNIT_STATE_MANA) + 0.10 * globals.DamageEventAmount);
    }
}
