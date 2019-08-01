import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';

export class TeleportMovement {
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        this.trig.AddCondition(() => this.gameGlobals.TeleportMovement && GetIssuedOrderIdBJ() === 851971);
        this.trig.AddAction(() => SetUnitPosition(GetOrderedUnit(), GetOrderPointX(), GetOrderPointY()));
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER);
    }
}
