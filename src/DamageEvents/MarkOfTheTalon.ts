import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

export class MarkOfTheTalon implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const playerId: number = globals.DamageEventSourceOwningPlayerId as number;
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        if (this.gameGlobals.MarkOfTheTalonCount[playerId] < 1) {
            return;
        }

        globals.DamageEventAmount +=
            GetWidgetLife(globals.DamageEventSource as unit) * 0.02 * this.gameGlobals.MarkOfTheTalonCount[playerId];
    }
}
