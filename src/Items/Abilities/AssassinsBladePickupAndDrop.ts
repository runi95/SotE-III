import { GameGlobals, AssassinsBladeStates } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class AssassinsBladePickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I02M');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (this.gameGlobals.AssassinsBlade[playerId] === AssassinsBladeStates.UNEQUIPPED) {
            this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.READY;
        }
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (this.gameGlobals.AssassinsBlade[playerId] === AssassinsBladeStates.READY) {
            this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.UNEQUIPPED;
        }
    }
}
