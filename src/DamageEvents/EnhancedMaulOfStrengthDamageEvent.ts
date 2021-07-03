import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

export class EnhancedMaulOfStrengthDamageEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly itemId: number = FourCC('I05E');

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

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.EnhancedMaulOfStrengthCount[playerId] < 1) {
            return;
        }

        globals.DamageEventAmount = globals.DamageEventAmount + 15 * GetItemCharges(GetItemOfTypeFromUnitBJ(globals.DamageEventSource as unit, this.itemId));
    }
}
