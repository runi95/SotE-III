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
        if (!UnitHasItemOfTypeBJ(GetTriggerUnit(), this.itemTypeId)) {
            const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
            this.gameGlobals.ClockworkPenguin[playerId] = false;
        }
    }
}
