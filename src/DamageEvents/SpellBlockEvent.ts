import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import * as settings from '../Game/GameSettings';

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

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
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
            const creepLevel: number = GetUnitLevel(globals.DamageEventTarget as unit);

            // Min creep resistance (level 1): 0
            //     creep resistance (level 25): 81
            //     creep resistance (level 50): 144
            //     creep resistance (level 75): 169
            // Max creep resistance (level 100): 169
            resistance = Pow(Math.floor(16 * ((creepLevel * 0.06) / (1 + 0.06 * creepLevel))), 2);
        
            // Min creep perseverance (level 1): 1
            //     creep perseverance (level 25): 25
            //     creep perseverance (level 50): 50
            //     creep perseverance (level 75): 75
            // Max creep perseverance (level 100): 100
            perseverance = creepLevel
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
