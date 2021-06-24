import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class HelmOfValorPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I05C');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.HelmOfValorCount[playerId] += 1;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 16;
        this.gameGlobals.PlayerSpellBlock[playerId] += 16;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.HelmOfValorCount[playerId] -= 1;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 16;
        this.gameGlobals.PlayerSpellBlock[playerId] -= 16;
    }
}
