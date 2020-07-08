import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class DruidsCrowPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I044');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerReflect[playerId] += 50;
        this.gameGlobals.PlayerSpellBlock[playerId] += 50;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerReflect[playerId] -= 50;
        this.gameGlobals.PlayerSpellBlock[playerId] -= 50;
    }
}
