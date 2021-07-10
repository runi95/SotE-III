import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

export class CorruptShieldEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A09H');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly curseBuffId: number = FourCC('Bcrs');

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

        const playerId: number = globals.DamageEventTargetOwningPlayerId as number;
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.CorruptShieldCount[playerId] < 1) {
            return;
        }

        if (UnitHasBuffBJ(globals.DamageEventSource as unit, this.curseBuffId)) {
            return;
        }

        const dummy: unit = CreateUnit(globals.DamageEventTargetOwningPlayer as player, this.dummyUnitTypeId, GetUnitX(globals.DamageEventSource as unit), GetUnitY(globals.DamageEventSource as unit), 0);
        UnitAddAbilityBJ(this.dummyAbilityId, dummy);
        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
        IssueTargetOrder(dummy, 'curse', globals.DamageEventSource as unit);
    }
}
