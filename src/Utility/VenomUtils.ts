import { TimerUtils } from "./TimerUtils";
import { EnvenomedUnit } from "./EnvenomedUnit";
import { Timer } from "../JassOverrides/Timer";

export class VenomUtils {
    private readonly timerUtils: TimerUtils;
    private readonly envenomedUnits: Map<number, EnvenomedUnit>;

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
        } else {
            const envenomedUnit: EnvenomedUnit = new EnvenomedUnit(u, venom);
            this.envenomedUnits.set(handleId, envenomedUnit);

            const t: Timer = this.timerUtils.newTimer();
            t.start(1, true, () => {
                SetUnitLifeBJ(envenomedUnit.getUnit(), Math.max(GetUnitState(envenomedUnit.getUnit(), UNIT_STATE_LIFE) - envenomedUnit.getVenom(), 1));
                envenomedUnit.setVenom(Math.floor(envenomedUnit.getVenom() / 2));
                if (envenomedUnit.getVenom() < 1) {
                    this.envenomedUnits.delete(handleId);
                    this.timerUtils.releaseTimer(t);
                }
            });
        }
    }

    public clearAllVenom(): void {
        this.envenomedUnits.forEach((envenomedUnit: EnvenomedUnit) => {
            envenomedUnit.setVenom(0);
        });
    }
}