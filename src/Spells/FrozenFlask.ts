import { Spell } from './Spell';
import { StunUtils } from '../Utility/StunUtils';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class FrozenFlask extends Spell {
    protected readonly abilityId: number = FourCC('A03A');
    private readonly chemicalSprayBuff: number = FourCC('B006');
    private readonly stunUtils: StunUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(stunUtils: StunUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.stunUtils = stunUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const damage: number = 190 * abilityLevel + 1.5 * this.spellCastUtils.GetIntelligence(GetTriggerUnit());
        UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
        if (UnitHasBuffBJ(GetSpellTargetUnit(), this.chemicalSprayBuff)) {
            this.stunUtils.stunUnit(GetSpellTargetUnit(), 1 + 0.5 * abilityLevel);
        } else {
            this.stunUtils.stunUnit(GetSpellTargetUnit(), 1 + 0.25 * abilityLevel);
        }
    }
}
