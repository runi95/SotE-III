import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class PhysicalBlockEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventTarget as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (!IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            return;
        }

        let piercing: number = 0;
        const damageSourcePlayerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (damageSourcePlayerId > 0 && damageSourcePlayerId < bj_MAX_PLAYERS) {
            if (IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
                piercing = this.gameGlobals.PlayerPiercing[damageSourcePlayerId];
            }
        }

        if (this.gameGlobals.PlayerPhysicalBlock[playerId] - piercing <= 0.405) {
            return;
        }

        globals.DamageEventAmount = Math.max(globals.DamageEventAmount - (this.gameGlobals.PlayerPhysicalBlock[playerId] - piercing), 0.0);
    }
}
