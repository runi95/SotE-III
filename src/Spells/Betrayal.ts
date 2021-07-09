import { Timer } from '../JassOverrides/Timer';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { StunUtils } from '../Utility/StunUtils';
import { TimerUtils } from '../Utility/TimerUtils';
import { Spell } from './Spell';

export class Betrayal extends Spell {
    protected readonly abilityId: number = FourCC('A00H');
    private readonly dummyAbilityId: number = FourCC('Arav');
    private readonly buffId: number = FourCC('Beng');
    private readonly spellCastUtils: SpellCastUtils;
    private readonly timerUtils: TimerUtils;
    private readonly stunUtils: StunUtils;

    constructor(spellCastUtils: SpellCastUtils, timerUtils: TimerUtils, stunUtils: StunUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
        this.timerUtils = timerUtils;
        this.stunUtils = stunUtils;
    }

    protected condition(): boolean {
        return super.condition() && !UnitHasBuffBJ(GetTriggerUnit(), this.buffId);
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, FourCC('A00H'));
        const damage: number = 75.0 * abilityLevel + 3 * this.spellCastUtils.GetIntelligence(trig);
        
        UnitAddAbility(trig, this.dummyAbilityId);
        UnitRemoveAbility(trig, this.dummyAbilityId);

        BlzPauseUnitEx(trig, true);
        SetUnitAnimationByIndex(trig, 6);

        SetUnitFlyHeight(trig, 25, 200);

        let ticks = 20;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.05, true, () => {
            ticks--;

            if (ticks > 10) {
                SetUnitVertexColor(trig, 255, 255, 255, Math.floor(255 - 25.5 * (20 - ticks)));
            } else {
                SetUnitVertexColor(trig, 255, 255, 255, Math.floor(255 - 25.5 * ticks));
            }

            if (ticks === 10) {
                this.stunUtils.stunUnit(targ, 1);
                SetUnitFlyHeight(trig, 0, 200);
                const targFacingDirection: number = GetUnitFacing(targ);
                SetUnitPosition(trig, GetUnitX(targ) + CosBJ(targFacingDirection) * -75, GetUnitY(targ) + SinBJ(targFacingDirection) * -75);
                SetUnitFacing(trig, targFacingDirection);
            }

            if (ticks === 8) {
                UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
            }

            if (ticks <= 0) {
                BlzPauseUnitEx(trig, false);
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
