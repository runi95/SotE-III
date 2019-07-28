import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from '../Game/GameGlobals';

export class RazorBladesStop {
    private readonly gameGlobals: GameGlobals;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_ISSUED_ORDER);
    }

    private condition(): boolean {
        return GetIssuedOrderIdBJ() === String2OrderIdBJ('undefend');
    }

    private action(): void {
        this.gameGlobals.RazorBladesOn[GetPlayerId(GetOwningPlayer(GetTriggerUnit()))] = false;
    }
}
