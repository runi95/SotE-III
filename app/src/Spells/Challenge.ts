import { Spell } from './Spell';

export class Challenge extends Spell {
    protected readonly abilityId: number = FourCC('A03N');

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const str: number = GetHeroStr(GetTriggerUnit(), true);
        const opponentStr: number = GetHeroStr(GetSpellTargetUnit(), true);

        UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), abilityLevel * str, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        UnitDamageTargetBJ(GetSpellTargetUnit(), GetTriggerUnit(), abilityLevel * opponentStr, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
    }
}
