import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class RunedBracers implements DamageEvent {
    private readonly itemTypeId: number = FourCC('I00S');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A025');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (GetOwningPlayer(globals.DamageEventTarget as unit) === Player(PLAYER_NEUTRAL_AGGRESSIVE)) {
            return;
        }

        const itm: item = GetItemOfTypeFromUnitBJ(globals.DamageEventTarget as unit, this.itemTypeId);
        let charges: number = 0;

        if (itm) {
            charges = GetItemCharges(itm) + 0.10 * globals.DamageEventAmount;

            if (charges >= 100) {
                SetItemCharges(itm, 0);
                const dummy: unit = CreateUnit(GetOwningPlayer(globals.DamageEventTarget as unit), this.dummyUnitTypeId,
                                               GetUnitX(globals.DamageEventSource as unit), GetUnitY(globals.DamageEventSource as unit), 0);
                UnitAddAbilityBJ(this.dummyAbilityId, dummy);
                UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                IssueTargetOrder(dummy, 'chainlightning', globals.DamageEventSource as unit);
            } else {
                SetItemCharges(itm, charges);
            }
        }
    }
}
