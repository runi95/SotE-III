import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import * as settings from '../Game/GameSettings';

export class MaulOfStrengthEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly itemId: number = FourCC('I023');

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }
        
        const damageEventTarget: unit = globals.DamageEventTarget as unit;
        const playerId: number = GetPlayerId(GetOwningPlayer(damageEventTarget));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.MaulOfStrengthCount[playerId] < 1) {
            return;
        }

        const maulOfStrength: item = GetItemOfTypeFromUnitBJ(damageEventTarget, this.itemId);
        const charges: number = GetItemCharges(maulOfStrength);
        if (charges < 15) {
            SetItemCharges(maulOfStrength, charges + 1);
        }

        const currentTimer = this.gameGlobals.MaulOfStrengthTimer[playerId];
        this.gameGlobals.MaulOfStrengthTimer[playerId] = 50;
        if (currentTimer <= 0) {
            const t: Timer = this.timerUtils.newTimer();
            t.start(0.1, true, () => {
                this.gameGlobals.MaulOfStrengthTimer[playerId]--;

                if (this.gameGlobals.MaulOfStrengthTimer[playerId] <= 0) {
                    SetItemCharges(GetItemOfTypeFromUnitBJ(damageEventTarget, this.itemId), 1);
                    this.timerUtils.releaseTimer(t);
                }
            });
        }        
    }
}
