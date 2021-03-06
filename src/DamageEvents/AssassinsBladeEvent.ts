import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals, ChargedItemStates } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

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

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const playerId: number = globals.DamageEventSourceOwningPlayerId as number;
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (this.gameGlobals.AssassinsBlade[playerId] !== ChargedItemStates.READY) {
            return;
        }

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        this.gameGlobals.AssassinsBlade[playerId] = ChargedItemStates.COOLDOWN;

        globals.DamageEventAmount = globals.DamageEventAmount + 420;

        SetItemCharges(GetItemOfTypeFromUnitBJ(globals.DamageEventSource as unit, this.itemId), 1);
    }
}
