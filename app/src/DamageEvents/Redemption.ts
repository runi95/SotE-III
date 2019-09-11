import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';

export class Redemption implements DamageEvent {
    private readonly abilityId: number = FourCC('A034');
    private frozen: boolean = false;

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
            0.1 * abilityLevel * globals.DamageEventAmount,
            ATTACK_TYPE_MAGIC,
            DAMAGE_TYPE_UNIVERSAL,
        );

        this.frozen = false;
    }
}
