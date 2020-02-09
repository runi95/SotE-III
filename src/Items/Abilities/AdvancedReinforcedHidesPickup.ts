import { ItemPickup } from '../ItemPickup';
import { GameGlobals } from '../../Game/GameGlobals';

export class AdvancedReinforcedHidesPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I02D');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] += 45;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 45;
    }
}
