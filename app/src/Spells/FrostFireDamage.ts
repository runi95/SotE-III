import { Trigger } from '../JassOverrides/Trigger';

export class FrostFireDamage {
    private readonly unitTypeId: number = FourCC('n00G');
    private readonly dummyUnitTypeId: number = FourCC('n00H');
    protected readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => GetUnitTypeId(GetTriggerUnit()) === this.unitTypeId);
        this.trig.AddAction(() => {
            const x: number = GetUnitX(GetTriggerUnit());
            const y: number = GetUnitY(GetTriggerUnit());
            const dummy: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitTypeId, x, y, bj_UNIT_FACING);

            UnitApplyTimedLifeBJ(10, this.timedLifeBuffId, dummy);
        });
    }
}
