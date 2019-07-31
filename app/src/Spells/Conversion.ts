import { Spell } from './Spell';

export class Conversion extends Spell {
    protected readonly abilityId: number = FourCC('A01O');

    protected action(): void {
        const intelligence: number = GetHeroInt(GetTriggerUnit(), true);
        if (IsUnitEnemy(GetSpellTargetUnit(), GetOwningPlayer(GetTriggerUnit()))) {
            UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), intelligence, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        } else {
            SetUnitLifeBJ(GetSpellTargetUnit(), GetUnitStateSwap(UNIT_STATE_LIFE, GetSpellTargetUnit()) + intelligence);
        }
    }
}
