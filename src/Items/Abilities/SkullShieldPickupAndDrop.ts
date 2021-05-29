import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class SkullShieldPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I03X');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerThorns[playerId] += 14;
        this.gameGlobals.PlayerReflect[playerId] += 14;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerThorns[playerId] -= 14;
        this.gameGlobals.PlayerReflect[playerId] -= 14;
    }
}
