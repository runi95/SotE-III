import { GameGlobals, ChargedItemStates } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ChargingItem } from '../../Utility/ChargingItem';

export class RingOfKingsPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I055');
    private readonly gameGlobals: GameGlobals;
    private readonly itemChargeUtils: ItemChargeUtils;

    constructor(gameGlobals: GameGlobals, itemChargeUtils: ItemChargeUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.itemChargeUtils = itemChargeUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.RingOfKingsCount[playerId] += 1;

        if (this.gameGlobals.RingOfKingsCount[playerId] > 1) {
            return;
        }

        const chargingItem = new ChargingItem(GetManipulatedItem(), 60);
        chargingItem.setChargeLimitReachFunction(() => {
            this.gameGlobals.RingOfKings[playerId] = ChargedItemStates.READY;
        });
        this.itemChargeUtils.addItem(chargingItem);
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.RingOfKingsCount[playerId] -= 1;

        if (this.gameGlobals.RingOfKingsCount[playerId] < 1) {
            this.gameGlobals.RingOfKings[playerId] = ChargedItemStates.UNEQUIPPED;
        }

        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
