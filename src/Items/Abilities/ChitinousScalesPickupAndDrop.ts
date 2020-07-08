import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class ChitinousScalesPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I04N');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] += 150;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 150;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] -= 150;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 150;
    }
}
