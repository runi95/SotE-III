import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { BuffUtils } from '../Utility/BuffUtils';
import { MantleOfIntelligenceBuff } from '../Utility/buffs/MantleOfIntelligenceBuff';
import * as settings from '../Game/GameSettings';

export class MantleOfIntelligenceEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly buffUtils: BuffUtils;

    constructor(gameGlobals: GameGlobals, buffUtils: BuffUtils) {
        this.gameGlobals = gameGlobals;
        this.buffUtils = buffUtils;
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

        if (this.gameGlobals.MantleOfIntelligenceCount[playerId] < 1) {
            return;
        }

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        if (!IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            return;
        }

        this.buffUtils.applyBuff(globals.DamageEventTarget as unit, new MantleOfIntelligenceBuff(playerId, this.gameGlobals));
    }
}
