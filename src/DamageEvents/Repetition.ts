import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import * as settings from '../Game/GameSettings';

export class Repetition implements DamageEvent {
    private readonly abilityId: number = FourCC('A048');
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

        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventSource as unit, this.abilityId);
        if (abilityLevel === 0) {
            return;
        }

        const playerId: number = globals.DamageEventSourceOwningPlayerId as number;
        const unitHandleId: number = GetHandleId(globals.DamageEventTarget as unit);
        if (this.gameGlobals.Repetition[playerId] === unitHandleId) {
            const currentRepetitions: number = this.gameGlobals.RepetitionCounter[playerId];

            if (currentRepetitions < 7) {
                this.gameGlobals.RepetitionCounter[playerId] = currentRepetitions + 1;
            }

            globals.DamageEventAmount += 25 * abilityLevel * (currentRepetitions / 7);
        } else {
            this.gameGlobals.Repetition[playerId] = unitHandleId;
            this.gameGlobals.RepetitionCounter[playerId] = 1;
        }
    }
}
