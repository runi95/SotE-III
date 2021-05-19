import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Rupture extends Spell {
    protected readonly abilityId: number = FourCC('A00I');
    private readonly dummyAbilityId: number = FourCC('A011');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        let previousX: number = GetUnitX(targ);
        let previousY: number = GetUnitY(targ);

        UnitAddAbilityBJ(this.dummyAbilityId, targ);

        let ticks = 200;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.05, true, () => {
            ticks--;
            const x: number = GetUnitX(targ);
            const y: number = GetUnitY(targ);
            const dist: number = Math.sqrt(Math.pow(x - previousX, 2) + Math.pow(y - previousY, 2));
            UnitDamageTargetBJ(trig, targ, dist, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            previousX = x;
            previousY = y;

            if (ticks <= 0) {
                UnitRemoveAbility(targ, this.dummyAbilityId);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
