import { Spell } from '../../Spells/Spell';

export class BloodiedSacrificialDaggerCast extends Spell {
    protected readonly abilityId: number = FourCC('A056');

    protected action(): void {
        UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), 500, ATTACK_TYPE_MELEE, DAMAGE_TYPE_UNIVERSAL);
        DestroyEffect(
            AddSpecialEffect(
                'Abilities\\Spells\\Other\\Stampede\\StampedeMissileDeath.mdl',
                GetUnitX(GetSpellTargetUnit()),
                GetUnitY(GetSpellTargetUnit()),
            ),
        );
    }
}
