import { Trigger } from '../JassOverrides/Trigger';
import { StunUtils } from '../Utility/StunUtils';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class ClockwerkGoblinDeath {
    private readonly unitTypeId: number = FourCC('n017');
    private readonly stunUtils: StunUtils;
    private readonly trig: Trigger = new Trigger();

    constructor(stunUtils: StunUtils) {
        this.stunUtils = stunUtils;

        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return GetUnitTypeId(GetTriggerUnit()) === this.unitTypeId;
    }

    private action(): void {
        const trig: unit = GetTriggerUnit();
        const damage: number = GetUnitUserData(trig);
        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(150.00, loc);

        grp.For(() => {
            if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                this.stunUtils.StunUnit(GetEnumUnit(), 1);
            }
        });

        RemoveLocation(loc);
        grp.Destroy();
    }
}
