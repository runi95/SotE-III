import { ItemPickup } from '../ItemPickup';
import { GameGlobals, AssassinsBladeStates } from '../../Game/GameGlobals';

export class AssassinsBladePickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I02M');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (this.gameGlobals.AssassinsBlade[playerId] === AssassinsBladeStates.UNEQUIPPED) {
            this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.READY;
        }
    }
}
