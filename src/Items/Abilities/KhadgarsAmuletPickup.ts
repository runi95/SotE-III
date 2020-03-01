import { ItemPickup } from '../ItemPickup';
import { GameGlobals } from '../../Game/GameGlobals';

export class KhadgarsAmuletPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I03Q');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerReflect[playerId] += 35;
        this.gameGlobals.PlayerSpellBlock[playerId] += 12;
    }
}
