import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class BoneChimesPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I046');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerPiercing[playerId] += 120;
        this.gameGlobals.PlayerLifesteal[playerId] += 80;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerPiercing[playerId] -= 120;
        this.gameGlobals.PlayerLifesteal[playerId] -= 80;
    }
}
