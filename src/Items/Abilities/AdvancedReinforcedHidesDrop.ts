import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class AdvancedReinforcedHidesDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I02D');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerSpellBlock[playerId] -= 50;
        this.gameGlobals.PlayerPhysicalBlock[playerId] -= 50;
    }
}
