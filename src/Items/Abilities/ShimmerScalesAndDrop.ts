import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { TimerUtils } from '../../Utility/TimerUtils';
import { Timer } from '../../JassOverrides/Timer';

export class ShimmerScalesAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I04R');
    private readonly timerUtils: TimerUtils;
    private readonly regenTimers: Map<number, Timer>;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
        this.regenTimers = new Map<number, Timer>();
    }

    protected pickup(): void {
        const trig: unit = GetTriggerUnit();
        const handleId: number = GetHandleIdBJ(trig);
        const t: Timer = this.timerUtils.newTimer();
        this.regenTimers.set(handleId, t);

        t.start(1, true, () => {
            SetWidgetLife(trig, GetWidgetLife(trig) + BlzGetUnitMaxHP(trig) * 0.02);
        });
    }

    protected drop(): void {
        const trig: unit = GetTriggerUnit();
        const handleId: number = GetHandleIdBJ(trig);
        const t: Timer | undefined = this.regenTimers.get(handleId)
        if (t !== undefined) {
            this.regenTimers.delete(handleId);
            this.timerUtils.releaseTimer(t);
        }
    }
}
