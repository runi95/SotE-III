import { KnockbackUtils } from '../Utility/KnockbackUtils';
import { Spell } from './Spell';

export class PandaBash extends Spell {
    protected readonly abilityId: number = FourCC('A03N');
    private readonly knockbackUtils: KnockbackUtils;

    constructor(knockbackUtils: KnockbackUtils) {
        super();

        this.knockbackUtils = knockbackUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const str: number = GetHeroStr(trig, true);

        const spellTargetUnit: unit = GetSpellTargetUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const spellTargetX: number = GetUnitX(spellTargetUnit);
        const spellTargetY: number = GetUnitY(spellTargetUnit);
        const dist: number = Math.sqrt(Pow(spellTargetX - x, 2) + Pow(spellTargetY - y, 2));
        const multX: number = 50 * ((spellTargetX - x) / dist);
        const multY: number = 50 * ((spellTargetY - y) / dist);
        
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdl', GetUnitX(spellTargetUnit), GetUnitY(spellTargetUnit)));
        UnitDamageTargetBJ(trig, spellTargetUnit, 70 + abilityLevel * str, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);

        this.knockbackUtils.knockback({
            knockbackTarget: spellTargetUnit,
            targetX: spellTargetX + multX,
            targetY: spellTargetY + multY,
            dist: 400,
            vel: 50,
            onWallHit: undefined,
            onKnockbackEnd: undefined
        });
    }
}
