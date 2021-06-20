import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class FieryBloodAxePickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I01E');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSplash[playerId] += 0.15;
        this.gameGlobals.PlayerExecute[playerId] += 55;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSplash[playerId] -= 0.15;
        this.gameGlobals.PlayerExecute[playerId] -= 55;
    }
}
