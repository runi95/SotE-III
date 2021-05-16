import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class MantleOfIntelligencePickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I03U');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.MantleOfIntelligenceCount[playerId] += 1;
        this.gameGlobals.PlayerPerseverance[playerId] += 20;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.MantleOfIntelligenceCount[playerId] -= 1;
        this.gameGlobals.PlayerPerseverance[playerId] -= 20;
    }
}
