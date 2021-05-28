import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class AncientFigurineEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        const owningPlayer: player = GetOwningPlayer(globals.DamageEventTarget as unit);
        const playerId: number = GetPlayerId(owningPlayer);
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (!this.gameGlobals.AncientFigurineActive[playerId]) {
            return;
        }

        if (!IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            return;
        }

        globals.DamageEventAmount *= 0.9;
    }
}
