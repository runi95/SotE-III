import { GameGlobals, ChargedItemStates } from '../../Game/GameGlobals';
import { ChargingItem } from '../../Utility/ChargingItem';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class SharpSteelAxePickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I00Q');
    private readonly gameGlobals: GameGlobals;
    private readonly itemChargeUtils: ItemChargeUtils;

    constructor(gameGlobals: GameGlobals, itemChargeUtils: ItemChargeUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.itemChargeUtils = itemChargeUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.SharpSteelAxeCount[playerId] += 1;

        if (this.gameGlobals.SharpSteelAxeCount[playerId] > 1) {
            return;
        }

        const chargingItem = new ChargingItem(GetManipulatedItem(), 60);
        chargingItem.setChargeLimitReachFunction(() => {
            this.gameGlobals.SharpSteelAxe[playerId] = ChargedItemStates.READY;
        });
        this.itemChargeUtils.addItem(chargingItem);
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.SharpSteelAxeCount[playerId] -= 1;

        if (this.gameGlobals.SharpSteelAxeCount[playerId] < 1) {
            this.gameGlobals.SharpSteelAxe[playerId] = ChargedItemStates.UNEQUIPPED;
        }

        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
