import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';

export class SpellBlockEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public event(globals: DamageEngineGlobals): void {
        if (!globals.IsDamageSpell) {
            return;
        }

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventTarget as unit));
        if (playerId < 0) {
            return;
        }

        let perseverance = 0;
        let resistance = 0;
        const damageSourcePlayerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (damageSourcePlayerId >= 0 && damageSourcePlayerId < bj_MAX_PLAYERS) {
            if (IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
                if (this.gameGlobals.BookOfEvilCount[damageSourcePlayerId] > 0 && this.randomNumberGenerator.random(1, 100) < 6) {
                    return;
                }

                perseverance = this.gameGlobals.PlayerPerseverance[damageSourcePlayerId];
            }
        }

        if (playerId >= bj_MAX_PLAYERS) {
            // Min creep resistance (level 1): 0
            // Max creep resistance (level 100): 169
            const creepLevel: number = GetUnitLevel(globals.DamageEventTarget as unit);
            resistance = Pow(Math.floor(16 * ((creepLevel * 0.06) / (1 + 0.06 * creepLevel))), 2);
        } else if (IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            if (this.gameGlobals.ScaledBootsCount[playerId] > 0) {
                globals.DamageEventAmount *= 0.92;
            }
            resistance = this.gameGlobals.PlayerSpellBlock[playerId];
        }

        const diff: number = resistance - perseverance;
        if (diff <= 0.405) {
            return;
        }

        globals.DamageEventAmount = RMaxBJ(globals.DamageEventAmount - diff, 0.0);
    }
}
