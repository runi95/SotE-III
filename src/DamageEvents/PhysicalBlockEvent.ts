import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { GameGlobals } from '../Game/GameGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';

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

        const playerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventTarget as unit));
        if (playerId < 0) {
            return;
        }

        let piercing: number = 0;
        let block: number = 0;
        const damageSourcePlayerId: number = GetPlayerId(GetOwningPlayer(globals.DamageEventSource as unit));
        if (damageSourcePlayerId >= 0 && damageSourcePlayerId < bj_MAX_PLAYERS) {
            if (IsUnitType(globals.DamageEventSource as unit, UNIT_TYPE_HERO)) {
                if (this.gameGlobals.ArcaniteSpearCount[damageSourcePlayerId] > 0 && this.randomNumberGenerator.random(1, 100) < 6) {
                    return;
                }

                piercing = this.gameGlobals.PlayerPiercing[damageSourcePlayerId];
            }
        }

        let damageEventTargetIsHero: boolean = false;
        if (playerId >= bj_MAX_PLAYERS) {
            // Min creep block (level 1): 0
            // Max creep block (level 100): 169
            const creepLevel: number = GetUnitLevel(globals.DamageEventTarget as unit);
            block = Pow(Math.floor(16 * ((creepLevel * 0.06) / (1 + 0.06 * creepLevel))), 2);
        } else if (IsUnitType(globals.DamageEventTarget as unit, UNIT_TYPE_HERO)) {
            damageEventTargetIsHero = true;
            block = this.gameGlobals.PlayerPhysicalBlock[playerId];
            if (this.gameGlobals.ArmoredBootsCount[playerId] > 0) {
                block *= 1.1;
            }
        }

        const diff: number = block - piercing;
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
