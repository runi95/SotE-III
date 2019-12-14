import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class MarkForDeath extends Spell {
    protected readonly abilityId: number = FourCC('A04B');
    private readonly dummyUnitId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A04D');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const dummy: unit = CreateUnit(
            GetOwningPlayer(GetTriggerUnit()),
            this.dummyUnitId,
            GetUnitX(GetSpellTargetUnit()),
            GetUnitY(GetSpellTargetUnit()),
            bj_UNIT_FACING,
        );
        UnitAddAbility(dummy, this.dummyAbilityId);
        SetUnitAbilityLevel(dummy, this.dummyAbilityId, abilityLevel);
        IssueTargetOrder(dummy, 'faeriefire', GetSpellTargetUnit());
        UnitApplyTimedLifeBJ(1, this.timedLifeBuffId, dummy);
    }
}
