import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class ClockworkPenguinDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I01N');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        let playerHasPenguin: boolean = false;
        for (let i: number = 0; i < 6; i++) {
            const itemInSlot: item = UnitItemInSlot(GetTriggerUnit(), i);
            if (GetItemTypeId(itemInSlot) === this.itemTypeId && itemInSlot !== GetManipulatedItem()) {
                playerHasPenguin = true;
            }
        }

        if (!playerHasPenguin) {
            const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
            this.gameGlobals.ClockworkPenguin[playerId] = false;
        }
    }
}
