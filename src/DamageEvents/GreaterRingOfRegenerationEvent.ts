import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { ChargedItemStates, GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';
import { BuffUtils } from '../Utility/BuffUtils';
import { GreaterRingOfRegenerationBuff } from '../Utility/buffs/GreaterRingOfRegenerationBuff';

export class GreaterRingOfRegenerationEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly buffUtils: BuffUtils;
    private readonly itemTypeId: number = FourCC('I05D');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A08N');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    constructor(gameGlobals: GameGlobals, buffUtils: BuffUtils) {
        this.gameGlobals = gameGlobals;
        this.buffUtils = buffUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const owningPlayer: player = GetOwningPlayer(globals.DamageEventTarget as unit);
        const playerId: number = GetPlayerId(owningPlayer);
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.GreaterRingOfRegeneration[playerId] !== ChargedItemStates.READY) {
            return;
        }

        if (!IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            return;
        }

        if (GetUnitLifePercent(globals.DamageEventTarget as unit) > 40) {
            return;
        }

        SetItemCharges(GetItemOfTypeFromUnitBJ(globals.DamageEventTarget as unit, this.itemTypeId), 1);
        this.gameGlobals.GreaterRingOfRegeneration[playerId] = ChargedItemStates.COOLDOWN;
        const dummy: unit = CreateUnit(owningPlayer, this.dummyUnitTypeId, GetUnitX(globals.DamageEventTarget as unit), GetUnitY(globals.DamageEventTarget as unit), 0);
        UnitAddAbilityBJ(this.dummyAbilityId, dummy);
        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
        IssueTargetOrder(dummy, 'bloodlust', globals.DamageEventTarget as unit);
        this.buffUtils.applyBuff(globals.DamageEventTarget as unit, new GreaterRingOfRegenerationBuff(globals.DamageEventTarget as unit));
    }
}
