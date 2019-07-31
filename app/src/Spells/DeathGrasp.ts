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
        DestroyEffect(AddSpecialEffectTarget('war3mapImported\\Death Grip.mdx', targ, 'origin'));
        UnitDamageTargetBJ(targ, trig, 100, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

        this.stunUtils.StunUnit(targ, 1);

        const t: Timer = this.timerUtils.NewTimer();
        t.start(1, false, () => {
            SetUnitPosition(targ, GetUnitX(trig), GetUnitY(trig));
            this.timerUtils.ReleaseTimer(t);
        });
    }
}
