import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class EnhancedMaulOfStrengthPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I05E');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.EnhancedMaulOfStrengthCount[playerId] += 1;
        SetItemCharges(GetManipulatedItem(), 1);
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.EnhancedMaulOfStrengthCount[playerId] -= 1;
    }
}
