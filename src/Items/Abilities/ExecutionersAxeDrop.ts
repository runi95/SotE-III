import { ItemDrop } from '../ItemDrop';
import { GameGlobals } from '../../Game/GameGlobals';

export class ExecutionersAxeDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I00Y');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerExecute[playerId] -= 20;
    }
}
