import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class LoadedCannonDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I00X');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSplash[playerId] -= 0.8;
    }
}
