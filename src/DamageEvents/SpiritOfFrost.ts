import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import * as settings from '../Game/GameSettings';

export class SpiritOfFrost implements DamageEvent {
    private readonly randomNumberGenerator: RandomNumberGenerator;
    private readonly spellCastUtils: SpellCastUtils;
    private readonly abilityId: number = FourCC('A01L');
    private readonly dummyUnitTypeId: number = FourCC('n00J');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    constructor(randomNumberGenerator: RandomNumberGenerator, spellCastUtils: SpellCastUtils) {
        this.randomNumberGenerator = randomNumberGenerator;
        this.spellCastUtils = spellCastUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId);

        if (abilityLevel > 0) {
            if (this.randomNumberGenerator.random(1, 100) < 10) {
                const mana: number = GetUnitState(globals.DamageEventTarget as unit, UNIT_STATE_MANA);
                if (mana > 25) {
                    const x: number = GetUnitX(globals.DamageEventTarget as unit) + GetRandomReal(0.0, 500.0) - 250.0;
                    const y: number = GetUnitY(globals.DamageEventTarget as unit) + GetRandomReal(0.0, 500.0) - 250.0;
                    const intelligence: number = this.spellCastUtils.GetIntelligence(globals.DamageEventTarget as unit);
                    const summon: unit = CreateUnit(
                        GetOwningPlayer(globals.DamageEventTarget as unit),
                        this.dummyUnitTypeId,
                        x,
                        y,
                        bj_UNIT_FACING,
                    );
                    UnitApplyTimedLifeBJ(abilityLevel, this.timedLifeBuffId, summon);
                    BlzSetUnitBaseDamage(summon, Math.floor(Number(2 * intelligence)), 0);
                    SetUnitManaBJ(globals.DamageEventTarget as unit, mana - 25.0);
                }
            }
        }
    }
}
