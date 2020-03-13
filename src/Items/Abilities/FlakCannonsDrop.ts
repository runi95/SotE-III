import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class FlakCannonsDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I04H');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSplash[playerId] -= 1;
        this.gameGlobals.PlayerSplashRadius[playerId] -= 100;
    }
}
