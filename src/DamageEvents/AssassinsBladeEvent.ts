import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals, AssassinsBladeStates } from '../Game/GameGlobals';
import { TimerUtils } from '../Utility/TimerUtils';

export class AssassinsBladeEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly itemId: number = FourCC('I02M');

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.AssassinsBlade[playerId] !== AssassinsBladeStates.READY) {
            return;
        }

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        this.gameGlobals.AssassinsBlade[playerId] = AssassinsBladeStates.COOLDOWN;

        globals.DamageEventAmount = globals.DamageEventAmount + 420;

        SetItemCharges(GetItemOfTypeFromUnitBJ(globals.DamageEventSource as unit, this.itemId), 1);
    }
}
