import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class Thorns implements DamageEvent {
    private frozen = false;
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        if (this.frozen) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventTarget as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (!IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            return;
        }

        if (this.gameGlobals.PlayerThorns[playerId] < 1) {
            return;
        }

        this.frozen = true;
        UnitDamageTargetBJ(
            globals.DamageEventTarget as unit,
            globals.DamageEventSource as unit,
            this.gameGlobals.PlayerThorns[playerId],
            ATTACK_TYPE_NORMAL,
            DAMAGE_TYPE_NORMAL,
        );
        this.frozen = false;
    }
}
