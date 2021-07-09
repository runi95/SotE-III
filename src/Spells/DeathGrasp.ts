import { Spell } from './Spell';
import { StunUtils } from '../Utility/StunUtils';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class DeathGrasp extends Spell {
    protected readonly abilityId: number = FourCC('A009');
    private readonly stunUtils: StunUtils;
    private readonly timerUtils: TimerUtils;

    constructor(stunUtils: StunUtils, timerUtils: TimerUtils) {
        super();

        this.stunUtils = stunUtils;
        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const str: number = GetHeroStr(trig, true);
        const damage: number = 250 * abilityLevel + 3 * str;
        DestroyEffect(AddSpecialEffectTarget('war3mapImported\\Death Grip.mdx', targ, 'origin'));
        UnitDamageTargetBJ(targ, trig, 100, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_UNIVERSAL);
        UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);

        this.stunUtils.stunUnit(targ, 1);

        const t: Timer = this.timerUtils.newTimer();
        t.start(1, false, () => {
            SetUnitPosition(targ, GetUnitX(trig), GetUnitY(trig));
            this.timerUtils.releaseTimer(t);
        });
    }
}
