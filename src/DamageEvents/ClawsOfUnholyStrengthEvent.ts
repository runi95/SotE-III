import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { ChargedItemStates, GameGlobals } from '../Game/GameGlobals';
import { BuffUtils } from '../Utility/BuffUtils';
import { ClawsOfUnholyStrengthBuff } from '../Utility/buffs/ClawsOfUnholyStrengthBuff';

export class ClawsOfUnholyStrengthEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly buffUtils: BuffUtils;
    private readonly itemTypeId: number = FourCC('I05I');

    constructor(gameGlobals: GameGlobals, buffUtils: BuffUtils) {
        this.gameGlobals = gameGlobals;
        this.buffUtils = buffUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        const playerId: number = globals.DamageEventTargetOwningPlayerId as number;
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (!IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            return;
        }

        if (this.gameGlobals.ClawsOfUnholyStrengthOn[playerId]) {
            globals.DamageEventAmount = 0.0;
        } else {
            if (this.gameGlobals.ClawsOfUnholyStrength[playerId] !== ChargedItemStates.READY) {
                return;
            }

            globals.DamageEventAmount = 0.0;
            SetItemCharges(GetItemOfTypeFromUnitBJ(globals.DamageEventTarget as unit, this.itemTypeId), 1);
            this.gameGlobals.ClawsOfUnholyStrength[playerId] = ChargedItemStates.COOLDOWN;
            this.buffUtils.applyBuff(globals.DamageEventTarget as unit, new ClawsOfUnholyStrengthBuff(globals.DamageEventTargetOwningPlayerId as number, this.gameGlobals));
        }
    }
}
