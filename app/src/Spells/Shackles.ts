import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Shackles extends Spell {
    protected readonly abilityId: number = FourCC('A02G');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const damage: number = 10 * abilityLevel + intelligence;
        const light: lightning = AddLightning('LEAS', true, GetUnitX(trig), GetUnitY(trig), GetUnitX(targ), GetUnitY(targ));
        const eff: effect = AddSpecialEffectTarget('Abilities\\Spells\\Human\\AerialShackles\\AerialShacklesTarget.mdl',
                                                   targ, 'chest,mount');
        SetUnitMoveSpeed(targ, GetUnitDefaultMoveSpeed(targ) - 100);

        let ticks: number = 100;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.05, true, () => {
            ticks--;

            const x: number = GetUnitX(trig);
            const y: number = GetUnitY(trig);
            const targX: number = GetUnitX(targ);
            const targY: number = GetUnitY(targ);
            const dist: number = Math.sqrt(Pow(x - targX, 2) + Pow(y - targY, 2));
            if (ticks % 5 === 0) {
                UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            }
            MoveLightning(light, true, x, y, targX, targY);

            if (!IsUnitAliveBJ(targ) || dist > 1000 || ticks <= 0) {
                SetUnitMoveSpeed(targ, GetUnitDefaultMoveSpeed(targ) + 100);
                DestroyEffect(eff);
                DestroyLightning(light);

                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
