import { ItemPickup } from '../ItemPickup';
import { GameGlobals } from '../../Game/GameGlobals';

export class DruidsCrowPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I044');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerReflect[playerId] += 50;
        this.gameGlobals.PlayerSpellBlock[playerId] += 50;
    }
}
