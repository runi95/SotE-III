import { Trigger } from '../JassOverrides/Trigger';

export class SnareTrapDeath {
    private unitTypeId: number = FourCC('n00E');
    private dummyUnitTypeId: number = FourCC('n001');
    private dummyAbilityId: number = FourCC('A00Z');
    private dummyTimedLifeAbilityId: number = FourCC('BTLF');
    private trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => {
            return GetUnitTypeId(GetTriggerUnit()) === this.unitTypeId;
        });

        this.trig.AddAction(() => {
            const loc: location = GetUnitLoc(GetDyingUnit());
            const grp: group = GetUnitsInRangeOfLocAll(150.00, loc);

            ForGroupBJ(grp, () => {
                if (IsPlayerEnemy(GetOwningPlayer(GetTriggerUnit()), GetOwningPlayer(GetEnumUnit()))) {
                    const dummy: unit = CreateUnit(GetOwningPlayer(GetDyingUnit()),
                                                   this.dummyUnitTypeId, GetUnitX(GetEnumUnit()), GetUnitY(GetEnumUnit()), bj_UNIT_FACING);
                    UnitAddAbilityBJ(this.dummyAbilityId, dummy);
                    IssueTargetOrderBJ(dummy, 'ensnare', GetEnumUnit());
                    UnitApplyTimedLifeBJ(2, this.dummyTimedLifeAbilityId, dummy);
                }
            });

            RemoveLocation(loc);
            DestroyGroup(grp);
        });
    }

}
