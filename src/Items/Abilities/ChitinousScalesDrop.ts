import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class ChitinousScalesDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I04N');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] -= 150;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 150;
    }
}
