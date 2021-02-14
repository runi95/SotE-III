import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class MaulOfStrengthPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I023');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.MaulOfStrengthCount[playerId] += 1;
        SetItemCharges(GetManipulatedItem(), 1);
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.MaulOfStrengthCount[playerId] -= 1;
    }
}
