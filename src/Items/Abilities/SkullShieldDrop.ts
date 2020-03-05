import { ItemDrop } from '../ItemDrop';
import { GameGlobals } from '../../Game/GameGlobals';

export class SkullShieldDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I03X');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerThorns[playerId] -= 25;
        this.gameGlobals.PlayerReflect[playerId] -= 25;
    }
}
