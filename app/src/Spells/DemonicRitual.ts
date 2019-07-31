import { Spell } from './Spell';

export class DemonicRitual extends Spell {
    protected readonly abilityId: number = FourCC('A015');

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);

        if (GetOwningPlayer(GetSpellTargetUnit()) === GetOwningPlayer(GetTriggerUnit())) {
            const maxHeal: number = 50.0 * abilityLevel + 3 * GetHeroStr(GetTriggerUnit(), true);
            const heal: number = RMinBJ(GetUnitStateSwap(UNIT_STATE_LIFE, GetSpellTargetUnit()), maxHeal);

            SetUnitLifeBJ(GetTriggerUnit(), GetUnitStateSwap(UNIT_STATE_LIFE, GetTriggerUnit()) + heal);
            UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), heal, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Undead\\DarkRitual\\DarkRitualCaster.mdl',
                                           GetUnitX(GetTriggerUnit()), GetUnitY(GetTriggerUnit())));
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                                           GetUnitX(GetSpellTargetUnit()), GetUnitY(GetSpellTargetUnit())));
        } else {
            const maxDamage: number = 50.0 * abilityLevel + 3 * GetHeroStr(GetTriggerUnit(), true);
            const damage: number = RMinBJ(GetUnitStateSwap(UNIT_STATE_LIFE, GetSpellTargetUnit()), maxDamage);
            UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            UnitDamageTargetBJ(GetSpellTargetUnit(), GetTriggerUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                                           GetUnitX(GetTriggerUnit()), GetUnitY(GetTriggerUnit())));
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                                           GetUnitX(GetSpellTargetUnit()), GetUnitY(GetSpellTargetUnit())));
        }
    }
}
