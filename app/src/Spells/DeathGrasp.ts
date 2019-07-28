import { Spell } from './Spell';
import { StunUtils } from '../Utility/StunUtils';

export class DeathGrasp extends Spell {
    protected abilityId: number = FourCC('A009');
    private stunUtils: StunUtils;

    constructor(stunUtils: StunUtils) {
        super();

        this.stunUtils = stunUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        DestroyEffect(AddSpecialEffectTarget('war3mapImported\\Death Grip.mdx', targ, 'origin'));
        UnitDamageTargetBJ(targ, trig, 100, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

        this.stunUtils.StunUnit(targ, 1);
        TriggerSleepAction(1.00); // TODO: We don't want to use sleep action here!
        SetUnitPosition(targ, GetUnitX(trig), GetUnitY(trig));
    }
}
