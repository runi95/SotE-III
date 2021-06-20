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
            t.start(1.5, true, () => {
                let endVenom = false;
                if (!UnitAlive(envenomedUnit.getUnit()) || envenomedUnit.getVenom() <= 1) {
                    endVenom = true;
                } else {
                    const currentHealth: number = GetUnitState(envenomedUnit.getUnit(), UNIT_STATE_LIFE);
                    const newHealth: number = Math.max(currentHealth - envenomedUnit.getVenom(), 1);
                    SetUnitLifeBJ(envenomedUnit.getUnit(), newHealth);
                    envenomedUnit.setVenom(Math.floor(envenomedUnit.getVenom() / 2));
                    DestroyEffect(AddSpecialEffectTarget('Abilities\\Spells\\Items\\OrbVenom\\OrbVenomSpecialArt.mdl', envenomedUnit.getUnit(), 'chest'));
                    const venomDamageTaken: number = Math.floor(currentHealth - newHealth);
                    const txt: texttag = CreateTextTag();
                    SetTextTagText(txt, `${venomDamageTaken}`, 0.023);
                    SetTextTagPos(
                        txt,
                        GetUnitX(envenomedUnit.getUnit()),
                        GetUnitY(envenomedUnit.getUnit()),
                        BlzGetUnitZ(envenomedUnit.getUnit()),
                    );
                    SetTextTagColor(txt, 60.0, 155.0, 50.0, 255.0);
                    SetTextTagPermanent(txt, false);
                    SetTextTagLifespan(txt, 4.0);
                    SetTextTagVelocity(txt, 0, 0.04);
                    SetTextTagFadepoint(txt, 2.5);
                }

                if (endVenom) {
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