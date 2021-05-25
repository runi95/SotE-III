import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class CrownOfKingsPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I053');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.CrownOfKingsCount[playerId] += 1;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 10;
        this.gameGlobals.PlayerSpellBlock[playerId] += 10;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.CrownOfKingsCount[playerId] -= 1;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 10;
        this.gameGlobals.PlayerSpellBlock[playerId] -= 10;
    }
}
