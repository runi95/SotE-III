import { GameGlobals } from '../../Game/GameGlobals';
import { ItemDrop } from '../ItemDrop';

export class GoblinBatteryDrop extends ItemDrop {
    protected readonly itemTypeId: number = FourCC('I01O');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected action(): void {
        const itemHandleId: number = GetHandleId(GetManipulatedItem());
        this.gameGlobals.GoblinBattery[itemHandleId] = false;
    }
}
