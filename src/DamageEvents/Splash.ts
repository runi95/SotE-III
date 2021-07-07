import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import * as settings from '../Game/GameSettings';

export class Splash implements DamageEvent {
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

        if (!(this.gameGlobals.PlayerSplash[playerId] > 0)) {
            return;
        }

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        const loc: location = GetUnitLoc(globals.DamageEventTarget as unit);
        const grp: GroupInRange = new GroupInRange(200.0 + this.gameGlobals.PlayerSplashRadius[playerId], loc);
        const damage: number = this.gameGlobals.PlayerSplash[playerId] * globals.DamageEventAmount;

        grp.for((u: unit) => {
            if (globals.DamageEventTarget !== u && UnitAlive(u) && IsUnitEnemy(u, Player(playerId))) {
                UnitDamageTargetBJ(globals.DamageEventSource as unit, u, damage, ATTACK_TYPE_MELEE, DAMAGE_TYPE_UNIVERSAL);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
