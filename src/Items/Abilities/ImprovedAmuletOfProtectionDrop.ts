import { ItemDrop } from '../ItemDrop';
import { GameGlobals } from '../../Game/GameGlobals';

export class ImprovedAmuletOfProtectionDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I04C');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerReflect[playerId] -= 70;
    }
}
