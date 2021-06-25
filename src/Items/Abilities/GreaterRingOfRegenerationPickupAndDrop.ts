import { GameGlobals, ChargedItemStates } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ChargingItem } from '../../Utility/ChargingItem';

export class GreaterRingOfRegenerationPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I05D');
    private readonly gameGlobals: GameGlobals;
    private readonly itemChargeUtils: ItemChargeUtils;

    constructor(gameGlobals: GameGlobals, itemChargeUtils: ItemChargeUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.itemChargeUtils = itemChargeUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.GreaterRingOfRegenerationCount[playerId] += 1;

        if (this.gameGlobals.GreaterRingOfRegenerationCount[playerId] > 1) {
            return;
        }

        const chargingItem = new ChargingItem(GetManipulatedItem(), 60);
        chargingItem.setChargeLimitReachFunction(() => {
            this.gameGlobals.GreaterRingOfRegeneration[playerId] = ChargedItemStates.READY;
        });
        this.itemChargeUtils.addItem(chargingItem);
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.GreaterRingOfRegenerationCount[playerId] -= 1;

        if (this.gameGlobals.GreaterRingOfRegenerationCount[playerId] < 1) {
            this.gameGlobals.GreaterRingOfRegeneration[playerId] = ChargedItemStates.UNEQUIPPED;
        }

        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
