import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

export class AgileBowEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly itemTypeId: number = FourCC('I054');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A08L');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

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

        const owningPlayer: player = GetOwningPlayer(globals.DamageEventSource as unit);
        const playerId: number = GetPlayerId(owningPlayer);
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.AgileBowCount[playerId] < 1) {
            return;
        }

        const agileBow: item = GetItemOfTypeFromUnitBJ(globals.DamageEventSource as unit, this.itemTypeId);
        const charges: number = GetItemCharges(agileBow);
        if (charges < 10) {
            SetItemCharges(agileBow, charges + 1);
        } else {
            const dummy: unit = CreateUnit(owningPlayer, this.dummyUnitTypeId, GetUnitX(globals.DamageEventTarget as unit), GetUnitY(globals.DamageEventTarget as unit), 0);
            UnitAddAbilityBJ(this.dummyAbilityId, dummy);
            UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
            IssueImmediateOrder(dummy, 'creepthunderclap');
            SetItemCharges(agileBow, 1);
        }
    }
}
