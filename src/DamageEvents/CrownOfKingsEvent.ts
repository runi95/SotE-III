import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

export class CrownOfKingsEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const playerId: number = globals.DamageEventTargetOwningPlayerId as number;
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.CrownOfKingsCount[playerId] < 1) {
            return;
        }

        const missingHealth: number = BlzGetUnitMaxHP(globals.DamageEventTarget as unit) - GetWidgetLife(globals.DamageEventTarget as unit);
        globals.DamageEventAmount -= Math.floor(missingHealth / 50);
    }
}
