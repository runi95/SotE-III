import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class FairyWandDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I03F');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerCriticalCast[playerId] -= 20;
    }
}
