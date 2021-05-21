import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class CrownOfKingsEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventTarget as unit));
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
