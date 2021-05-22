import { GameGlobals, ChargedItemStates } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ChargingItem } from '../../Utility/ChargingItem';

export class AssassinsBladePickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I02M');
    private readonly gameGlobals: GameGlobals;
    private readonly itemChargeUtils: ItemChargeUtils;

    constructor(gameGlobals: GameGlobals, itemChargeUtils: ItemChargeUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.itemChargeUtils = itemChargeUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.AssassinsBladeCount[playerId] += 1;
        this.gameGlobals.PlayerLifesteal[playerId] += 10;

        if (this.gameGlobals.AssassinsBladeCount[playerId] > 1) {
            return;
        }

        const chargingItem = new ChargingItem(GetManipulatedItem(), 30);
        chargingItem.setChargeLimitReachFunction(() => {
            this.gameGlobals.AssassinsBlade[playerId] = ChargedItemStates.READY;
        });
        this.itemChargeUtils.addItem(chargingItem);
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.AssassinsBladeCount[playerId] -= 1;
        this.gameGlobals.PlayerLifesteal[playerId] -= 10;

        if (this.gameGlobals.AssassinsBladeCount[playerId] < 1) {
            this.gameGlobals.AssassinsBlade[playerId] = ChargedItemStates.UNEQUIPPED;
        }

        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
