import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

export class Lifesteal implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

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

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        const additionalLifesteal: number =
            (this.gameGlobals.LegionDoomHornCount[playerId] > 0 ? globals.PiercingOverflowAmount : 0) +
            (this.gameGlobals.FastVampireClawsCount[playerId] > 0 ? 0.05 * globals.DamageEventAmount : 0);
        const healthGained: number = Math.min(globals.DamageEventAmount, this.gameGlobals.PlayerLifesteal[playerId] + additionalLifesteal);
        if (healthGained > 0) {
            DestroyEffect(
                AddSpecialEffect(
                    'Abilities\\Spells\\Undead\\VampiricAura\\VampiricAuraTarget.mdl',
                    GetUnitX(globals.DamageEventSource as unit),
                    GetUnitY(globals.DamageEventSource as unit),
                ),
            );
            SetWidgetLife(globals.DamageEventSource as unit, GetWidgetLife(globals.DamageEventSource as unit) + healthGained);
        }
    }
}
