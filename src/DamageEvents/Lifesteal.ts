import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';

export class Lifesteal implements DamageEvent {
    private readonly gameGlobals: GameGlobals;

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

        if (!IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
            return;
        }

        const additionalLifesteal = this.gameGlobals.LegionDoomHornCount[playerId] > 0 ? globals.PiercingOverflowAmount : 0;
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
