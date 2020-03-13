import { ItemPickup } from '../ItemPickup';
import { GameGlobals } from '../../Game/GameGlobals';

export class FlakCannonsPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I04H');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSplash[playerId] += 1;
        this.gameGlobals.PlayerSplashRadius[playerId] += 100;
    }
}
