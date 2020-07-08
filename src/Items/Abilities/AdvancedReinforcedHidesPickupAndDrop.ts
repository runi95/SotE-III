import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class AdvancedReinforcedHidesPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I02D');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] += 50;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 50;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] -= 50;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 50;
    }
}
