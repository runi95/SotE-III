import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';

export class MasterStaffPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I03M');
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        super();

        this.gameGlobals = gameGlobals;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerCriticalCast[playerId] += 20;
        this.gameGlobals.PlayerCooldownReduction[playerId] += 0.1;
    }

    protected drop(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        this.gameGlobals.PlayerCriticalCast[playerId] -= 20;
        this.gameGlobals.PlayerCooldownReduction[playerId] -= 0.1;
    }
}
