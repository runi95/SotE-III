import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class Conversion extends Spell {
    protected readonly abilityId: number = FourCC('A01O');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const intelligence: number = this.spellCastUtils.GetIntelligence(GetTriggerUnit());
        const damageOrHealing: number = 80 + 2 * intelligence;

        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Undead\\DarkRitual\\DarkRitualTarget.mdl', GetUnitX(GetSpellTargetUnit()), GetUnitY(GetSpellTargetUnit())));
        if (IsUnitEnemy(GetSpellTargetUnit(), GetOwningPlayer(GetTriggerUnit()))) {
            UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), damageOrHealing, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        } else {
            SetUnitLifeBJ(GetSpellTargetUnit(), GetUnitState(GetSpellTargetUnit(), UNIT_STATE_LIFE) + damageOrHealing);
        }
    }
}
