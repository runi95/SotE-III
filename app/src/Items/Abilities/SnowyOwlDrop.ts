import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class SnowyOwlDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I02C');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        let playerHasOwl: boolean = false;
        for (let i: number = 0; i < 6; i++) {
            const itemInSlot: item = UnitItemInSlot(GetTriggerUnit(), i);
            if (GetItemTypeId(itemInSlot) === this.itemTypeId && itemInSlot !== GetManipulatedItem()) {
                playerHasOwl = true;
            }
        }

        if (!playerHasOwl) {
            const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
            this.gameGlobals.SnowyOwl[playerId] = false;
        }
    }
}
