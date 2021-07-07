import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import * as settings from '../Game/GameSettings';

export class EnhancedMaulOfStrengthEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly itemId: number = FourCC('I05E');

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const playerId: number = globals.DamageEventTargetOwningPlayerId as number;
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.EnhancedMaulOfStrengthCount[playerId] < 1) {
            return;
        }

        const damageEventTarget: unit = globals.DamageEventTarget as unit;
        const enhancedMaulOfStrength: item = GetItemOfTypeFromUnitBJ(damageEventTarget, this.itemId);
        const charges: number = GetItemCharges(enhancedMaulOfStrength);
        if (charges < 15) {
            SetItemCharges(enhancedMaulOfStrength, charges + 1);
        }

        const currentTimer = this.gameGlobals.EnhancedMaulOfStrengthTimer[playerId];
        this.gameGlobals.EnhancedMaulOfStrengthTimer[playerId] = 50;
        if (currentTimer <= 0) {
            const t: Timer = this.timerUtils.newTimer();
            t.start(0.1, true, () => {
                this.gameGlobals.EnhancedMaulOfStrengthTimer[playerId]--;

                if (this.gameGlobals.EnhancedMaulOfStrengthTimer[playerId] <= 0) {
                    SetItemCharges(GetItemOfTypeFromUnitBJ(damageEventTarget, this.itemId), 1);
                    this.timerUtils.releaseTimer(t);
                }
            });
        }
    }
}
