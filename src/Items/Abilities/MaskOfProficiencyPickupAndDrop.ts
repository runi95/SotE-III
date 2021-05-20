import { GameGlobals } from '../../Game/GameGlobals';
import { ChargingItem } from '../../Utility/ChargingItem';
import { ItemChargeUtils } from '../../Utility/ItemChargeUtils';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class MaskOfProficiencyPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I026');
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

        this.itemChargeUtils.addItem(new ChargingItem(GetManipulatedItem(), 12));
    }

    protected drop(): void {
        this.itemChargeUtils.removeItem(GetHandleId(GetManipulatedItem()));
    }
}
