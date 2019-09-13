import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class HawkSpellDamage implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly unitTypeId: number = FourCC('n00D');

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (GetUnitTypeId(globals.DamageEventSource as unit) !== this.unitTypeId) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        globals.DamageEventAmount = globals.DamageEventAmount + 2 * this.gameGlobals.SummonHawkInt[playerId];
    }
}
