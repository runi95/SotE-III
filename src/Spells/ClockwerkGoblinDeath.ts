import { Trigger } from '../JassOverrides/Trigger';
import { StunUtils } from '../Utility/StunUtils';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class ClockwerkGoblinDeath {
    private readonly unitTypeId: number = FourCC('n017');
    private readonly stunUtils: StunUtils;
    private readonly trig: Trigger = new Trigger();

    constructor(stunUtils: StunUtils) {
        this.stunUtils = stunUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return GetUnitTypeId(GetTriggerUnit()) === this.unitTypeId;
    }

    private action(): void {
        const trig: unit = GetTriggerUnit();
        const damage: number = GetUnitUserData(trig);
        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(150.00, loc);

        grp.for((u: unit) => {
            if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                this.stunUtils.stunUnit(u, 1);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
