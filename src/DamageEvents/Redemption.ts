import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Redemption implements DamageEvent {
    private readonly abilityId: number = FourCC('A034');
    private frozen = false;
    private readonly randomNumberGenerator: RandomNumberGenerator;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(randomNumberGenerator: RandomNumberGenerator, spellCastUtils: SpellCastUtils) {
        this.randomNumberGenerator = randomNumberGenerator;
        this.spellCastUtils = spellCastUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        if (this.frozen) {
            return;
        }

        if (globals.IsDamageSpell) {
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

        this.frozen = true;
        UnitDamageTargetBJ(
            globals.DamageEventTarget as unit,
            globals.DamageEventSource as unit,
            7 + 3 * abilityLevel + 0.3333 * abilityLevel * int,
            ATTACK_TYPE_NORMAL,
            DAMAGE_TYPE_NORMAL,
        );
        this.frozen = false;
    }
}
