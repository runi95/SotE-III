import { Spell } from './Spell';

export class SnareTrap extends Spell {
    protected readonly abilityId: number = FourCC('A00Y');
    private readonly dummyUnitId: number = FourCC('n00E');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        UnitApplyTimedLifeBJ(60, this.timedLifeBuffId,
                             CreateUnit(GetOwningPlayer(GetTriggerUnit()),
                                        this.dummyUnitId, GetSpellTargetX(), GetSpellTargetY(), bj_UNIT_FACING));
    }
}
