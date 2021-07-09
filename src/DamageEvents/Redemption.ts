import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import * as settings from '../Game/GameSettings';

export class Redemption implements DamageEvent {
    private readonly abilityId: number = FourCC('A034');
    private readonly randomNumberGenerator: RandomNumberGenerator;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(randomNumberGenerator: RandomNumberGenerator, spellCastUtils: SpellCastUtils) {
        this.randomNumberGenerator = randomNumberGenerator;
        this.spellCastUtils = spellCastUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (globals.IsDamageSpell) {
            return;
        }

        if (globals.DamageEventDamageT === settings.DAMAGE_TYPE_UNIVERSAL) {
            return;
        }

        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId);
        if (abilityLevel === 0) {
            return;
        }

        const rng: number = this.randomNumberGenerator.random(1, 10);
        if (rng < 8) {
            return;
        }

        const int: number = this.spellCastUtils.GetIntelligence(globals.DamageEventTarget as unit);
        DestroyEffect(
            AddSpecialEffect(
                'Abilities\\Spells\\Items\\AIfb\\AIfbSpecialArt.mdl',
                GetUnitX(globals.DamageEventSource as unit),
                GetUnitY(globals.DamageEventSource as unit),
            ),
        );

        UnitDamageTargetBJ(
            globals.DamageEventTarget as unit,
            globals.DamageEventSource as unit,
            7 + 3 * abilityLevel + 0.3333 * abilityLevel * int,
            ATTACK_TYPE_MAGIC,
            DAMAGE_TYPE_UNIVERSAL,
        );
    }
}
