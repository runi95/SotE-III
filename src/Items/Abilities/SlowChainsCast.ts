import { Spell } from '../../Spells/Spell';

export class SlowChainsCast extends Spell {
    protected readonly abilityId: number = FourCC('A062');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A064');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const x: number = GetUnitX(GetSpellTargetUnit());
        const y: number = GetUnitY(GetSpellTargetUnit());
        const dummy: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitTypeId, x, y, 0);
        UnitAddAbilityBJ(this.dummyAbilityId, dummy);
        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
        IssueTargetOrder(dummy, 'slow', GetSpellTargetUnit());
    }
}
