import { GameGlobals } from '../../Game/GameGlobals';
import { ChargingItem } from '../../Utility/ChargingItem';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class GoblinBatteryPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I01O');
    private readonly gameGlobals: GameGlobals;
    private readonly itemChargeUtils: ItemChargeUtils;

    constructor(gameGlobals: GameGlobals, itemChargeUtils: ItemChargeUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.itemChargeUtils = itemChargeUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (GetTriggerUnit() !== this.gameGlobals.PlayerHero[playerId]) {
            return;
        }

        const chargingItem = new ChargingItem(GetManipulatedItem(), 100);
        chargingItem.setChargeCondition(() => {
            const mana: number = GetUnitState(this.gameGlobals.PlayerHero[playerId], UNIT_STATE_MANA);
            if (mana < 1) {
                return false;
            }

            SetUnitManaBJ(this.gameGlobals.PlayerHero[playerId], mana - 1);
            return true;
        });
        this.itemChargeUtils.addItem(chargingItem);
    }

    protected drop(): void {
        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
