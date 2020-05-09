import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class EnhancedJavelinEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.EnhancedJavelinCount[playerId] < 1) {
            return;
        }

        if (this.gameGlobals.EnhancedJavelinAttackCount[playerId] < 5) {
            this.gameGlobals.EnhancedJavelinAttackCount[playerId]++;
            return;
        }

        this.gameGlobals.EnhancedJavelinAttackCount[playerId] = 0;
        globals.DamageEventAmount += 200;
    }
}
