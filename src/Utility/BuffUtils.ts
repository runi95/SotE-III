import { BuffedUnit } from './BuffedUnit';
import { Buff } from './Buff';
import { TimerUtils } from './TimerUtils';

export class BuffUtils {
    private readonly timerUtils: TimerUtils;
    private readonly buffedUnits: Map<number, BuffedUnit>;

    constructor(timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;
        this.buffedUnits = new Map<number, BuffedUnit>();
    }

    /**
     * Adds a buff to a specific unit
     *
     * @param u - The unit to buff
     * @param buff - The buff to apply to the unit
     */
    public applyBuff(u: unit, buff: Buff): void {
        const handleId: number = GetHandleIdBJ(u);
        if (this.buffedUnits.has(handleId)) {
            (this.buffedUnits.get(handleId) as BuffedUnit).addBuff(buff);
        } else {
            const buffedUnit: BuffedUnit = new BuffedUnit(handleId, this.timerUtils, (bu: BuffedUnit) =>
                this.buffedUnits.delete(bu.getHandleId()),
            );
            buffedUnit.addBuff(buff);

            this.buffedUnits.set(handleId, buffedUnit);
        }
    }

    public clearAllBuffs(): void {
        this.buffedUnits.forEach((buffedUnit: BuffedUnit) => buffedUnit.getAllBuffs().forEach((buff: Buff) => buff.setDuration(0)));
    }
}
