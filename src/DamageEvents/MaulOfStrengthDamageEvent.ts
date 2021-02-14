import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class MaulOfStrengthDamageEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly itemId: number = FourCC('I023');

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

        if (this.gameGlobals.MaulOfStrengthCount[playerId] < 1) {
            return;
        }

        globals.DamageEventAmount = globals.DamageEventAmount + 5 * GetItemCharges(GetItemOfTypeFromUnitBJ(globals.DamageEventSource as unit, this.itemId));
    }
}
