import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals, AssassinsBladeStates } from '../Game/GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class AssassinsBladeEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly itemId: number = FourCC('I02M');

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.AssassinsBlade[playerId] !== AssassinsBladeStates.READY) {
            return;
        }

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.COOLDOWN;

        globals.DamageEventAmount = globals.DamageEventAmount + 450;

        const t: Timer = this.timerUtils.newTimer();
        t.start(30, false, () => {
            if (UnitHasItemOfTypeBJ(this.gameGlobals.PlayerHero[playerId], this.itemId)) {
                this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.READY;
            } else {
                this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.UNEQUIPPED;
            }

            this.timerUtils.releaseTimer(t);
        });
    }
}
