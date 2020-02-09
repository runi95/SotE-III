import { Spell } from './Spell';

export class CommandoFlag extends Spell {
    protected readonly abilityId: number = FourCC('A03L');
    private readonly dummyUnitId: number = FourCC('n021');
    private readonly dummyAbilityId: number = FourCC('A03M');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const dummy: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitId, x, y, bj_UNIT_FACING);
        UnitAddAbility(dummy, this.dummyAbilityId);
        UnitApplyTimedLife(dummy, this.timedLifeBuffId, 10);
    }
}
