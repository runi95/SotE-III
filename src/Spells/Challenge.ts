import { Spell } from './Spell';

export class Challenge extends Spell {
    protected readonly abilityId: number = FourCC('A03N');

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const str: number = GetHeroStr(GetTriggerUnit(), true);
        const opponentStr: number = IsUnitType(GetSpellTargetUnit(), UNIT_TYPE_HERO) ? GetHeroStr(GetSpellTargetUnit(), true) : str / 2;

        UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), 3 * abilityLevel * str, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        UnitDamageTargetBJ(GetSpellTargetUnit(), GetTriggerUnit(), 3 * abilityLevel * opponentStr, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
    }
}
