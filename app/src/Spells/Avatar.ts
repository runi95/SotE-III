import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Avatar extends Spell {
    protected readonly abilityId: number = FourCC('A01E');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(GetTriggerUnit(), true);
        const bonusHP: number = 250 * abilityLevel + 5 * intelligence;
        const bonusArmor: number = abilityLevel;
        const bonusDamage: number = 10 * abilityLevel + 0.10 * intelligence;
        SetUnitScalePercent(trig, 150, 150, 150);
        BlzSetUnitMaxHP(trig, BlzGetUnitMaxHP(trig) + bonusHP);
        SetUnitLifeBJ(trig, GetUnitState(trig, UNIT_STATE_LIFE) + bonusHP);
        BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) + bonusArmor);
        BlzSetUnitBaseDamage(trig, BlzGetUnitBaseDamage(trig, 1) + bonusDamage, 1);

        const t: Timer = this.timerUtils.newTimer();
        t.start(10, false, () => {
            SetUnitScalePercent(trig, 100, 100, 100);
            BlzSetUnitMaxHP(trig, BlzGetUnitMaxHP(trig) - bonusHP);
            BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) - bonusArmor);
            BlzSetUnitBaseDamage(trig, BlzGetUnitBaseDamage(trig, 1) - bonusDamage, 1);

            this.timerUtils.releaseTimer(t);
        });
    }
}
