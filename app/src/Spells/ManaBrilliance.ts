import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class ManaBrilliance implements DamageEvent {
    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (GetUnitTypeId(globals.DamageEventSource as unit) !== FourCC('N000')) {
            return;
        }

        SetUnitManaBJ(globals.DamageEventSource as unit,
                      GetUnitStateSwap(UNIT_STATE_MANA, globals.DamageEventSource as unit) + 0.10 * globals.DamageEventAmount);
    }
}
