import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';

export class Redemption implements DamageEvent {
    private readonly abilityId: number = FourCC('A034');
    private frozen: boolean = false;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public event(globals: DamageEngineGlobals): void {
        if (this.frozen) {
            return;
        }

        this.frozen = true;

        if (globals.IsDamageSpell) {
            this.frozen = false;
            return;
        }

        const abilityLevel: number = GetUnitAbilityLevel(globals.DamageEventTarget as unit, this.abilityId);
        if (abilityLevel === 0) {
            this.frozen = false;
            return;
        }

        const rng: number = this.randomNumberGenerator.random(1, 10);
        if (rng < 8) {
            return;
        }

        const int: number = GetHeroInt(globals.DamageEventTarget as unit, true);
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
            10 + 0.2 * abilityLevel * int,
            ATTACK_TYPE_NORMAL,
            DAMAGE_TYPE_NORMAL,
        );

        this.frozen = false;
    }
}
