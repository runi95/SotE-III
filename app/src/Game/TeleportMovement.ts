import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';

export class TeleportMovement {
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        this.trig.addCondition(() => this.gameGlobals.TeleportMovement && GetIssuedOrderIdBJ() === 851971);
        this.trig.addAction(() => SetUnitPosition(GetOrderedUnit(), GetOrderPointX(), GetOrderPointY()));
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER);
    }
}
