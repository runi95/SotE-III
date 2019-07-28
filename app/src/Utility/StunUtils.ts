import { StunnedUnit } from './StunnedUnit';
import { TimerUtils } from './TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class StunUtils {
    private readonly stunAbilityId: number = FourCC('A00S');
    private readonly stunnedUnits: Map<number, StunnedUnit>;
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;
        this.stunnedUnits = new Map<number, StunnedUnit>();
    }

    /**
     * Stun a unit for a certain amount of time
     *
     * @param unit - The unit to stun
     * @param duration - The duration (in seconds) to stun the unit for
     */
    public StunUnit(unit: unit, duration: number): void {
        const handleId: number = GetHandleIdBJ(unit);
        if (this.stunnedUnits.has(handleId)) {
            (this.stunnedUnits.get(handleId) as StunnedUnit).AddDuration(duration);
        } else {
            const stunnedUnit: StunnedUnit = new StunnedUnit(unit, duration);
            this.stunnedUnits.set(handleId, stunnedUnit);
            UnitAddAbilityBJ(this.stunAbilityId, stunnedUnit.GetUnit());
            PauseUnit(stunnedUnit.GetUnit(), true);
            const t: Timer = this.timerUtils.NewTimer();
            t.start(0.05, true, () => {
                stunnedUnit.AddDuration(-0.05);
                if (stunnedUnit.GetDuration() <= 0) {
                    UnitRemoveAbility(stunnedUnit.GetUnit(), this.stunAbilityId);
                    PauseUnit(stunnedUnit.GetUnit(), false);
                    this.stunnedUnits.delete(handleId);
                    this.timerUtils.ReleaseTimer(t);
                }
            });
        }
    }
}
