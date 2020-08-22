import { Buff } from './Buff';
import { BuffTypes } from './BuffTypes';
import { TimerUtils } from './TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class BuffedUnit {
    private readonly handleId: number;
    private readonly timerUtils: TimerUtils;
    private readonly clearCallback: (buffedUnit: BuffedUnit) => void;
    private buffs: Map<BuffTypes, Buff>;

    constructor(handleId: number, timerUtils: TimerUtils, clearCallback: (buffedUnit: BuffedUnit) => void) {
        this.handleId = handleId;
        this.timerUtils = timerUtils;
        this.clearCallback = clearCallback;
        this.buffs = new Map<BuffTypes, Buff>();
    }

    public getHandleId(): number {
        return this.handleId;
    }

    public addBuff(buff: Buff): void {
        if (this.buffs.has(buff.getBuffType())) {
            (this.buffs.get(buff.getBuffType()) as Buff).stackBuff(buff);
        } else {
            buff.onInitialBuffApply();
            this.buffs.set(buff.getBuffType(), buff);

            const t: Timer = this.timerUtils.newTimer();
            t.start(buff.tickTimeout, true, () => {
                buff.addDuration(-buff.tickTimeout);
                if (buff.getDuration() <= 0) {
                    buff.clearBuff();
                    this.buffs.delete(buff.getBuffType());

                    if (this.buffs.size < 1) {
                        this.clearCallback(this);
                    }

                    this.timerUtils.releaseTimer(t);
                } else {
                    buff.tick();
                }
            });
        }
    }

    public hasBuff(buffType: BuffTypes): boolean {
        return this.buffs.has(buffType);
    }

    public getBuff(buffType: BuffTypes): Buff | undefined {
        return this.buffs.get(buffType);
    }

    public getAllBuffs(): Map<BuffTypes, Buff> {
        return this.buffs;
    }
}
