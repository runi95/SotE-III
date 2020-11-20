import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { StunUtils } from '../Utility/StunUtils';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Slash extends Spell {
    protected readonly abilityId: number = FourCC('A03H');
    private readonly stunAbilityId: number = FourCC('A00S');
    private readonly dummyAbilityId: number = FourCC('Arav');
    private readonly timerUtils: TimerUtils;
    private readonly stunUtils: StunUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, stunUtils: StunUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.stunUtils = stunUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = 150 * abilityLevel + 2 * intelligence;
        PauseUnit(trig, true);
        UnitAddAbility(trig, this.dummyAbilityId);
        UnitRemoveAbility(trig, this.dummyAbilityId);

        const eff: effect = AddSpecialEffectTarget('Abilities\\Weapons\\PhoenixMissile\\Phoenix_Missile_mini.mdl', trig, 'weapon');

        SetUnitAnimationByIndex(trig, 4);
        SetUnitFlyHeight(trig, 200, 400);

        let ticks: number = 5;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.25, true, () => {
            ticks--;

            if (ticks === 3) {
                const facing: number = GetUnitFacing(targ);
                const xDirection: number = Math.cos((facing * Math.PI) / 180);
                const yDirection: number = Math.sin((facing * Math.PI) / 180);
                const x: number = GetUnitX(targ) - 100 * xDirection;
                const y: number = GetUnitY(targ) - 100 * yDirection;
                SetUnitPosition(trig, x, y);
                SetUnitFacing(trig, facing);
                this.stunUtils.stunUnit(targ, 1);
                SetUnitFlyHeight(trig, 0, 400);
                SetUnitAnimationByIndex(trig, 3);
            } else if (ticks <= 0) {
                UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                DestroyEffect(eff);
                const stunAbilityLevel: number = GetUnitAbilityLevel(trig, this.stunAbilityId);
                if (stunAbilityLevel === 0) {
                    PauseUnit(trig, false);
                }

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
