import { Spell } from '../../Spells/Spell';

export class VampireDaggerCast extends Spell {
    protected readonly abilityId: number = FourCC('A05C');

    protected action(): void {
        UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), 1000, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        DestroyEffect(
            AddSpecialEffect(
                'Abilities\\Spells\\Other\\Stampede\\StampedeMissileDeath.mdl',
                GetUnitX(GetSpellTargetUnit()),
                GetUnitY(GetSpellTargetUnit()),
            ),
        );
        SetUnitLifeBJ(GetTriggerUnit(), GetUnitState(GetTriggerUnit(), UNIT_STATE_LIFE) + 666);
    }
}
