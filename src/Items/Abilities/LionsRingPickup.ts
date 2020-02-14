import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickup } from '../ItemPickup';

export class LionsRingPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I01L');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] += 24;
    }
}
