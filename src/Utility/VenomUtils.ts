import { TimerUtils } from "./TimerUtils";
import { EnvenomedUnit } from "./EnvenomedUnit";
import { Timer } from "../JassOverrides/Timer";

export class VenomUtils {
    private readonly timerUtils: TimerUtils;
    private readonly envenomedUnits: Map<number, EnvenomedUnit>;
    private readonly VENOM_DURATION: number = 4;

    constructor(timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;
        this.envenomedUnits = new Map<number, EnvenomedUnit>();
    }

    /**
     * Apply a certain amount of venom to a unit
     *
     * @param u - The unit to stun
     * @param venom - The amount of venom to apply to the unit
     */
    public applyVenom(u: unit, venom: number): void {
        const handleId: number = GetHandleIdBJ(u);
        if (this.envenomedUnits.has(handleId)) {
            (this.envenomedUnits.get(handleId) as EnvenomedUnit).addVenom(venom);
            (this.envenomedUnits.get(handleId) as EnvenomedUnit).setDuration(this.VENOM_DURATION);
        } else {
            const envenomedUnit: EnvenomedUnit = new EnvenomedUnit(u, this.VENOM_DURATION, venom);
            this.envenomedUnits.set(handleId, envenomedUnit);

            const t: Timer = this.timerUtils.newTimer();
            t.start(1, true, () => {
                envenomedUnit.addDuration(-1);
                SetUnitLifeBJ(envenomedUnit.getUnit(), Math.max(GetUnitState(envenomedUnit.getUnit(), UNIT_STATE_LIFE) - envenomedUnit.getVenom(), 1));
                if (envenomedUnit.getDuration() <= 0) {
                    this.envenomedUnits.delete(handleId);
                    this.timerUtils.releaseTimer(t);
                }
            });
        }
    }

    public clearAllVenom(): void {
        this.envenomedUnits.forEach((envenomedUnit: EnvenomedUnit) => {
            envenomedUnit.setDuration(0);
            envenomedUnit.setVenom(0);
        });
    }
}