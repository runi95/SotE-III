import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class ImprovedBalancedShieldDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I02B');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] -= 12;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 12;
    }
}
