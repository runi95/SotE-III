import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class ManaStonePickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I015');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.ManaStoneCount[playerId] += 1;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.ManaStoneCount[playerId] -= 1;
    }
}
