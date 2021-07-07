import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import * as settings from '../Game/GameSettings';

export class PhysicalBlockEvent implements DamageEvent {
    private readonly gameGlobals: GameGlobals;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(gameGlobals: GameGlobals, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const playerId: number = globals.DamageEventTargetOwningPlayerId as number;
        if (playerId < 0) {
            return;
        }

        let piercing = 0;
        let block = 0;
        const damageSourcePlayerId: number = globals.DamageEventSourceOwningPlayerId as number;
        if (damageSourcePlayerId >= 0 && damageSourcePlayerId < bj_MAX_PLAYERS) {
            if (IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
                if (this.gameGlobals.ArcaniteSpearCount[damageSourcePlayerId] > 0 && this.randomNumberGenerator.random(1, 100) < 6) {
                    return;
                }

                piercing = this.gameGlobals.PlayerPiercing[damageSourcePlayerId];
            }
        }

        let damageEventTargetIsHero = false;
        if (playerId >= bj_MAX_PLAYERS) {
            const creepLevel: number = GetUnitLevel(globals.DamageEventTarget as unit);

            // Min creep block (level 1): 0
            //     creep block (level 25): 81
            //     creep block (level 50): 144
            //     creep block (level 75): 169
            // Max creep block (level 100): 169
            block = Pow(Math.floor(16 * ((creepLevel * 0.06) / (1 + 0.06 * creepLevel))), 2);

            // Min creep piercing (level 1): 1
            //     creep piercing (level 25): 25
            //     creep piercing (level 50): 50
            //     creep piercing (level 75): 75
            // Max creep piercing (level 100): 100
            piercing = creepLevel
        } else if (IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            damageEventTargetIsHero = true;
            block = this.gameGlobals.PlayerPhysicalBlock[playerId];
            if (this.gameGlobals.ArmoredBootsCount[playerId] > 0) {
                block *= 1.1;
            }
        }

        let diff: number = block - piercing;
        if (globals.DamageEventDefenseReduction > 0) {
            diff -= (diff * globals.DamageEventDefenseReduction);
        }

        if (diff <= 0.405) {
            globals.PiercingOverflowAmount = Math.abs(diff);
            return;
        }

        const damageEventAmount: number = Math.max(globals.DamageEventAmount - diff, 0.0);
        if (damageEventTargetIsHero) {
            if (this.gameGlobals.ImpenetrableShieldCount[playerId] > 0) {
                if (block > globals.DamageEventAmount) {
                    SetUnitLifeBJ(globals.DamageEventTarget as unit, GetWidgetLife(globals.DamageEventTarget as unit) + block - globals.DamageEventAmount);
                }
            }
        }

        globals.DamageEventAmount = damageEventAmount;
    }
}
