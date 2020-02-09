import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class BeastSense extends Spell {
    protected readonly abilityId: number = FourCC('A00V');
    private readonly dummyUnitId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A00W');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const loc: location = GetUnitLoc(GetTriggerUnit());
        const grp: GroupInRange = new GroupInRange(3000.00, loc);
        grp.for((u: unit) => {
            if (IsPlayerEnemy(GetOwningPlayer(GetTriggerUnit()), GetOwningPlayer(u))) {
                const x: number = GetUnitX(u);
                const y: number = GetUnitY(u);
                const dummy: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.dummyUnitId, x, y, bj_UNIT_FACING);

                UnitAddAbilityBJ(this.dummyAbilityId, dummy);
                IssueTargetOrderById(dummy, 852570, u);
                UnitApplyTimedLifeBJ(1.00, this.timedLifeBuffId, dummy);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
