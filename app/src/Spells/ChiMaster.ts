import { Trigger } from '../JassOverrides/Trigger';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class ChiMaster {
    private abilityLevel: number = 0;
    private ticks: number = 0;
    private readonly dummyAbilityId: number = FourCC('A03P');
    private readonly unitTypeId: number = FourCC('N01Y');
    private readonly timerUtils: TimerUtils;
    private readonly trig: Trigger = new Trigger();

    constructor(timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    private condition(): boolean {
        return GetUnitTypeId(GetTriggerUnit()) === this.unitTypeId;
    }

    private action(): void {
        this.ticks = 10;

        if (this.abilityLevel < 5) {
            const trig: unit = GetTriggerUnit();
            if (this.abilityLevel === 0) {
                this.abilityLevel = 1;
                UnitAddAbility(trig, this.dummyAbilityId);
                const t: Timer = this.timerUtils.newTimer();
                t.start(1, true, () => {
                    this.ticks--;

                    if (this.ticks <= 0) {
                        UnitRemoveAbility(trig, this.dummyAbilityId);
                        this.timerUtils.releaseTimer(t);
                        this.abilityLevel = 0;
                    }
                });
            } else {
                this.abilityLevel++;
                SetUnitAbilityLevel(trig, this.dummyAbilityId, this.abilityLevel);
            }
        }
    }
}
