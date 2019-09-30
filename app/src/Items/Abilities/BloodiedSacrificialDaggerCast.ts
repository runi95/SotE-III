import { TimerUtils } from '../../Utility/TimerUtils';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';
import { GroupInRange } from '../../JassOverrides/GroupInRange';
import { Trigger } from '../../JassOverrides/Trigger';
import { Spell } from '../../Spells/Spell';
import { Timer } from '../../JassOverrides/Timer';

export class BloodiedSacrificialDaggerCast extends Spell {
    protected readonly abilityId: number = FourCC('A056');

    protected action(): void {
        UnitDamageTargetBJ(GetTriggerUnit(), GetSpellTargetUnit(), 1000, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        DestroyEffect(
            AddSpecialEffect(
                'Abilities\\Spells\\Other\\Stampede\\StampedeMissileDeath.mdl',
                GetUnitX(GetSpellTargetUnit()),
                GetUnitY(GetSpellTargetUnit()),
            ),
        );
    }
}
