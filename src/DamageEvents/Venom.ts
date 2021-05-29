import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { VenomUtils } from '../Utility/VenomUtils';
import * as settings from '../Game/GameSettings';

export class Venom implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly venomUtils: VenomUtils;

    constructor(gameGlobals: GameGlobals, venomUtils: VenomUtils) {
        this.gameGlobals = gameGlobals;
        this.venomUtils = venomUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (playerId < 0 || playerId >= bj_MAX_PLAYERS) {
            return;
        }

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        const venom = this.gameGlobals.PlayerVenom[playerId];
        if (venom < 1) {
            return;
        }

        this.venomUtils.applyVenom(globals.DamageEventTarget as unit, venom);
    }
}
