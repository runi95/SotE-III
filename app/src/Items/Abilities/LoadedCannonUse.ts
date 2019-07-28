import { DamageEvent } from '../../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../../DamageEngine/DamageEngineGlobals';

export class LoadedCannonUse implements DamageEvent {
    private readonly itemTypeId: number = FourCC('I00X');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A025');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (UnitHasItemOfTypeBJ(globals.DamageEventSource as unit, this.itemTypeId)) {
            return;
        }

        const loc: location = GetUnitLoc(globals.DamageEventTarget as unit);
        const grp: group = GetUnitsInRangeOfLocAll(200.00, loc);
        const damage: number = 0.10 * globals.DamageEventAmount;

        ForGroup(grp, () => {
            if (GetEnumUnit() !== globals.DamageEventTarget as unit &&
                IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(globals.DamageEventSource as unit)) &&
                IsUnitAliveBJ(GetEnumUnit())) {
                // DisableTrigger(GetTriggeringTrigger());
                UnitDamageTargetBJ(globals.DamageEventSource as unit, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                // EnableTrigger(GetTriggeringTrigger());
            }
        });

        RemoveLocation(loc);
        DestroyGroup(grp);
    }
}
