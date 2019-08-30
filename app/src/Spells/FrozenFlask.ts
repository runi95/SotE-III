import { Spell } from './Spell';
import { StunUtils } from '../Utility/StunUtils';

export class FrozenFlask extends Spell {
    protected readonly abilityId: number = FourCC('A03A');
    private readonly chemicalSprayBuff: number = FourCC('B006');
    private readonly stunUtils: StunUtils;

    constructor(stunUtils: StunUtils) {
        super();

        this.stunUtils = stunUtils;
    }

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const damage: number = 50 * abilityLevel + GetHeroInt(GetTriggerUnit(), true);
        UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        if (UnitHasBuffBJ(GetSpellTargetUnit(), this.chemicalSprayBuff)) {
            this.stunUtils.stunUnit(GetSpellTargetUnit(), 1 + 0.5 * abilityLevel);
        } else {
            this.stunUtils.stunUnit(GetSpellTargetUnit(), 1 + 0.25 * abilityLevel);
        }
    }
}
