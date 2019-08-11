import { DamageEvent } from '../../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../../DamageEngine/DamageEngineGlobals';
import { GroupInRange } from '../../JassOverrides/GroupInRange';

export class LoadedCannonUse implements DamageEvent {
    private readonly itemTypeId: number = FourCC('I00X');

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (UnitHasItemOfTypeBJ(globals.DamageEventSource as unit, this.itemTypeId)) {
            return;
        }

        const loc: location = GetUnitLoc(globals.DamageEventTarget as unit);
        const grp: GroupInRange = new GroupInRange(200.00, loc);
        const damage: number = 0.10 * globals.DamageEventAmount;

        grp.for((u: unit) => {
            if (u !== globals.DamageEventTarget as unit &&
                IsUnitEnemy(u, GetOwningPlayer(globals.DamageEventSource as unit)) &&
                UnitAlive(u)) {
                UnitDamageTargetBJ(globals.DamageEventSource as unit, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
