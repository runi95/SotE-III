import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ChargingItem } from '../../Utility/ChargingItem';

export class FullVialPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I016');
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

        this.itemChargeUtils.addItem(new ChargingItem(GetManipulatedItem(), 60));
    }

    protected drop(): void {
        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
