import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Avatar extends Spell {
    protected readonly abilityId: number = FourCC('A01E');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(GetTriggerUnit());
        const bonusHP: number = 250 * abilityLevel + 5 * intelligence;
        const bonusArmor: number = abilityLevel;
        const bonusDamage: number = Math.ceil(10 * abilityLevel + 0.1 * intelligence);
        DestroyEffect(AddSpecialEffectTarget('Abilities\\Spells\\Human\\Avatar\\AvatarCaster.mdl', trig, 'origin'));
        BlzSetUnitMaxHP(trig, BlzGetUnitMaxHP(trig) + bonusHP);
        SetUnitLifeBJ(trig, GetUnitState(trig, UNIT_STATE_LIFE) + bonusHP);
        BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) + bonusArmor);
        BlzSetUnitBaseDamage(trig, BlzGetUnitBaseDamage(trig, 0) + bonusDamage, 0);

        let unitScaleTick = 20;
        const unitScaleTimer: Timer = this.timerUtils.newTimer();
        unitScaleTimer.start(0.05, true, () => {
            unitScaleTick--;

            const scaleSize = 150 - 2.5 * unitScaleTick;
            SetUnitScalePercent(trig, scaleSize, scaleSize, scaleSize);

            if (unitScaleTick <= 0) {
                this.timerUtils.releaseTimer(unitScaleTimer);
            }
        });

        const t: Timer = this.timerUtils.newTimer();
        t.start(10, false, () => {
            SetUnitScalePercent(trig, 100, 100, 100);
            BlzSetUnitMaxHP(trig, BlzGetUnitMaxHP(trig) - bonusHP);
            BlzSetUnitArmor(trig, BlzGetUnitArmor(trig) - bonusArmor);
            BlzSetUnitBaseDamage(trig, BlzGetUnitBaseDamage(trig, 0) - bonusDamage, 0);

            this.timerUtils.releaseTimer(t);
        });
    }
}
