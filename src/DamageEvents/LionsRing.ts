import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import * as settings from '../Game/GameSettings';

export class LionsRing implements DamageEvent {
    private readonly itemTypeId: number = FourCC('I01L');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A043');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        if (globals.DamageEventTargetOwningPlayer as player === Player(PLAYER_NEUTRAL_AGGRESSIVE)) {
            return;
        }

        const itm: item = GetItemOfTypeFromUnitBJ(globals.DamageEventTarget as unit, this.itemTypeId);
        if (itm) {
            const charges: number = Math.round(GetItemCharges(itm) + 0.1 * globals.DamageEventAmount);

            if (charges >= 100) {
                SetItemCharges(itm, 1);
                const dummy: unit = CreateUnit(
                    GetOwningPlayer(globals.DamageEventTarget as unit),
                    this.dummyUnitTypeId,
                    GetUnitX(globals.DamageEventSource as unit),
                    GetUnitY(globals.DamageEventSource as unit),
                    0,
                );
                UnitAddAbilityBJ(this.dummyAbilityId, dummy);
                UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                IssueTargetOrder(dummy, 'chainlightning', globals.DamageEventSource as unit);
            } else {
                SetItemCharges(itm, charges);
            }
        }
    }
}
