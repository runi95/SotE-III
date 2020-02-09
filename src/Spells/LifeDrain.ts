import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class LifeDrain extends Spell {
    protected readonly abilityId: number = FourCC('A03D');
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
        const damageAndHeal: number = (160 * abilityLevel + 2 * intelligence) / 200;
        const light: lightning = AddLightning('DRAL', true, GetUnitX(trig), GetUnitY(trig), GetUnitX(targ), GetUnitY(targ));

        let ticks: number = 200;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.05, true, () => {
            ticks--;
            const distance: number = Math.sqrt(Pow(GetUnitX(trig) - GetUnitX(targ), 2) + Pow(GetUnitY(trig) - GetUnitY(targ), 2));

            if (!UnitAlive(targ) || distance > 1000 || ticks <= 0) {
                DestroyLightning(light);
                this.timerUtils.releaseTimer(t);
            } else {
                MoveLightning(light, true, GetUnitX(trig), GetUnitY(trig), GetUnitX(targ), GetUnitY(targ));
                UnitDamageTargetBJ(trig, targ, damageAndHeal, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                SetUnitLifeBJ(trig, GetUnitState(trig, UNIT_STATE_LIFE) + damageAndHeal);
            }
        });
    }
}
