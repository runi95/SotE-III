import { Spell } from './Spell';

export class DemonicSacrifice extends Spell {
    protected readonly abilityId: number = FourCC('A015');

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);

        if (GetOwningPlayer(GetSpellTargetUnit()) === GetOwningPlayer(GetTriggerUnit())) {
            const maxHeal: number = 150.0 * abilityLevel + 3 * GetHeroStr(GetTriggerUnit(), true);
            const heal: number = RMinBJ(GetUnitState(GetSpellTargetUnit(), UNIT_STATE_MAX_LIFE) - GetUnitState(GetSpellTargetUnit(), UNIT_STATE_LIFE), maxHeal);

            SetUnitLifeBJ(GetSpellTargetUnit(), GetUnitState(GetSpellTargetUnit(), UNIT_STATE_LIFE) + heal);
            UnitDamageTargetBJ(GetSpellTargetUnit(), GetTriggerUnit(), heal, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
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
            const maxDamage: number = 150.0 * abilityLevel + 3 * GetHeroStr(GetTriggerUnit(), true);
            const damage: number = RMinBJ(GetUnitState(GetSpellTargetUnit(), UNIT_STATE_LIFE), maxDamage);
            UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
            UnitDamageTargetBJ(GetSpellTargetUnit(), GetTriggerUnit(), damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_UNIVERSAL);
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
