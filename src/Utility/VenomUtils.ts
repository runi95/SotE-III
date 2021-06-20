import { TimerUtils } from "./TimerUtils";
import { EnvenomedUnit } from "./EnvenomedUnit";
import { Timer } from "../JassOverrides/Timer";
import { GameGlobals } from "../Game/GameGlobals";

export class VenomUtils {
    private readonly timerUtils: TimerUtils;
    private readonly gameGlobals: GameGlobals;
    private readonly envenomedUnits: Map<number, EnvenomedUnit>;
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A097');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;
        this.gameGlobals = gameGlobals;
        this.envenomedUnits = new Map<number, EnvenomedUnit>();
    }

    /**
     * Apply a certain amount of venom to a unit
     *
     * @param u - The unit to stun
     * @param venom - The amount of venom to apply to the unit
     */
    public applyVenom(u: unit, venomOwnerPlayerId: number, venom: number): void {
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
                    const x: number = GetUnitX(envenomedUnit.getUnit());
                    const y: number = GetUnitY(envenomedUnit.getUnit());
                    SetTextTagPos(
                        txt,
                        x,
                        y,
                        BlzGetUnitZ(envenomedUnit.getUnit()),
                    );
                    SetTextTagColor(txt, 60.0, 155.0, 50.0, 255.0);
                    SetTextTagPermanent(txt, false);
                    SetTextTagLifespan(txt, 4.0);
                    SetTextTagVelocity(txt, 0, 0.04);
                    SetTextTagFadepoint(txt, 2.5);

                    if (this.gameGlobals.ImprovedCreatureClawsCount[venomOwnerPlayerId] > 0) {
                        const dummy: unit = CreateUnit(Player(venomOwnerPlayerId), this.dummyUnitTypeId, x, y, 0);
                        UnitAddAbilityBJ(this.dummyAbilityId, dummy);
                        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                        IssueTargetOrder(
                            dummy,
                            'slow',
                            envenomedUnit.getUnit()
                        );
                    }
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