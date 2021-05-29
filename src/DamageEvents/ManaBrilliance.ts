import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import * as settings from '../Game/GameSettings';

export class ManaBrilliance implements DamageEvent {
    private readonly unitTypeId: number = FourCC('N000');

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        if (GetUnitTypeId(globals.DamageEventSource as unit) !== this.unitTypeId) {
            return;
        }

        SetUnitManaBJ(
            globals.DamageEventSource as unit,
            GetUnitState(globals.DamageEventSource as unit, UNIT_STATE_MANA) + 0.1 * globals.DamageEventAmount,
        );
    }
}
