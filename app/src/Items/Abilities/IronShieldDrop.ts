import { ItemDrop } from '../ItemDrop';
import { GameGlobals } from '../../Game/GameGlobals';

export class IronShieldDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I005');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 3;
    }
}
