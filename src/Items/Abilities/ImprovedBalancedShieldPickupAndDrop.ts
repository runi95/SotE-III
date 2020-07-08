import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class ImprovedBalancedShieldPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I02B');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] += 75;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 75;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] -= 75;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 75;
    }
}
