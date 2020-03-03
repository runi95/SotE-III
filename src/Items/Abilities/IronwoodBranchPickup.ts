import { ItemPickup } from '../ItemPickup';
import { GameGlobals } from '../../Game/GameGlobals';

export class IronwoodBranchPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I03B');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerThorns[playerId] += 18;
    }
}
