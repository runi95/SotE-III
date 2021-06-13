import { Spell } from './Spell';

export class DemonicSacrifice extends Spell {
    protected readonly abilityId: number = FourCC('A015');

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);

        if (GetOwningPlayer(GetSpellTargetUnit()) === GetOwningPlayer(GetTriggerUnit())) {
            const maxHeal: number = 250.0 * abilityLevel + 3 * GetHeroStr(GetTriggerUnit(), true);
            const heal: number = RMinBJ(GetUnitState(GetSpellTargetUnit(), UNIT_STATE_LIFE), maxHeal);

            SetUnitLifeBJ(GetTriggerUnit(), GetUnitState(GetTriggerUnit(), UNIT_STATE_LIFE) + heal);
            UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), heal, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            DestroyEffect(
                AddSpecialEffect(
                    'Abilities\\Spells\\Undead\\DarkRitual\\DarkRitualCaster.mdl',
                    GetUnitX(GetTriggerUnit()),
                    GetUnitY(GetTriggerUnit()),
                ),
            );
            DestroyEffect(
                AddSpecialEffect(
                    'Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                    GetUnitX(GetSpellTargetUnit()),
                    GetUnitY(GetSpellTargetUnit()),
                ),
            );
        } else {
            const maxDamage: number = 50.0 * abilityLevel + 3 * GetHeroStr(GetTriggerUnit(), true);
            const damage: number = RMinBJ(GetUnitState(GetSpellTargetUnit(), UNIT_STATE_LIFE), maxDamage);
            UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            UnitDamageTargetBJ(GetSpellTargetUnit(), GetTriggerUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_UNIVERSAL);
            DestroyEffect(
                AddSpecialEffect(
                    'Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                    GetUnitX(GetTriggerUnit()),
                    GetUnitY(GetTriggerUnit()),
                ),
            );
            DestroyEffect(
                AddSpecialEffect(
                    'Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                    GetUnitX(GetSpellTargetUnit()),
                    GetUnitY(GetSpellTargetUnit()),
                ),
            );
        }
    }
}
