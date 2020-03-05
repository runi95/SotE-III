import { ItemPickup } from '../ItemPickup';
import { GameGlobals } from '../../Game/GameGlobals';

export class StoneArmorPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I03Y');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerThorns[playerId] += 40;
        this.gameGlobals.PlayerReflect[playerId] += 40;
        this.gameGlobals.PlayerPhysicalBlock[playerId] += 40;
        this.gameGlobals.PlayerSpellBlock[playerId] += 40;
    }
}
