import { Trigger } from '../JassOverrides/Trigger';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GameGlobals } from '../Game/GameGlobals';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Regenerate {
    private readonly abilityId: number = FourCC('A047');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly trig: Trigger = new Trigger();
    private readonly spellCastUtils: SpellCastUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;

        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    private action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        if (abilityLevel === 0) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        if (this.gameGlobals.Regenerate[playerId]) {
            return;
        }

        this.gameGlobals.Regenerate[playerId] = true;

        const totalHealAmount: number = 100 * abilityLevel + 1.5 * this.spellCastUtils.GetIntelligence(trig);
        let ticks: number = 5;
        const tickHealAmount: number = totalHealAmount / ticks;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;

            SetUnitLifeBJ(trig, GetUnitState(trig, UNIT_STATE_LIFE) + tickHealAmount);

            if (ticks <= 0) {
                this.gameGlobals.Regenerate[playerId] = false;
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
