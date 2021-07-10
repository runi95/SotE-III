import { ChargedItemStates, GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ChargingItem } from '../../Utility/ChargingItem';

export class ClawsOfUnholyStrengthPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I05I');
    private readonly gameGlobals: GameGlobals;
    private readonly itemChargeUtils: ItemChargeUtils;

    constructor(gameGlobals: GameGlobals, itemChargeUtils: ItemChargeUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.itemChargeUtils = itemChargeUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.ClawsOfUnholyStrengthCount[playerId] += 1;

        if (this.gameGlobals.ClawsOfUnholyStrengthCount[playerId] > 1) {
            return;
        }

        const chargingItem = new ChargingItem(GetManipulatedItem(), 120);
        chargingItem.setChargeLimitReachFunction(() => {
            this.gameGlobals.ClawsOfUnholyStrength[playerId] = ChargedItemStates.READY;
        });
        this.itemChargeUtils.addItem(chargingItem);
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.ClawsOfUnholyStrengthCount[playerId] -= 1;

        if (this.gameGlobals.ClawsOfUnholyStrengthCount[playerId] < 1) {
            this.gameGlobals.ClawsOfUnholyStrength[playerId] = ChargedItemStates.UNEQUIPPED;
        }

        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
