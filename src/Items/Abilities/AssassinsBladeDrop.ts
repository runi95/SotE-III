import { ItemDrop } from '../ItemDrop';
import { GameGlobals, AssassinsBladeStates } from '../../Game/GameGlobals';

export class AssassinsBladeDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I02M');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (this.gameGlobals.AssassinsBlade[playerId] === AssassinsBladeStates.READY) {
            this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.UNEQUIPPED;
        }
    }
}
