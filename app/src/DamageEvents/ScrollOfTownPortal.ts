import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class ScrollOfTownPortal implements DamageEvent {
    private readonly dummyAbilityId: number = FourCC('A02X');

    public event(globals: DamageEngineGlobals): void {
        if (GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.dummyAbilityId) > 0
            && IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            UnitRemoveAbility(globals.DamageEventTarget as unit, this.dummyAbilityId);
        }
    }
}
