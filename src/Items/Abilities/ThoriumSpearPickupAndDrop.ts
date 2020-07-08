import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class ThoriumSpearPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I04I');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerPiercing[playerId] += 150;
        this.gameGlobals.ArcaniteSpearCount[playerId] += 1;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerPiercing[playerId] -= 150;
        this.gameGlobals.ArcaniteSpearCount[playerId] -= 1;
    }
}
