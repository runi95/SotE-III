import { ItemPickup } from '../ItemPickup';
import { GameGlobals } from '../../Game/GameGlobals';

export class ImprovedBalancedShieldPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I02B');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] += 20;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 20;
    }
}
