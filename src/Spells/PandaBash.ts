import { KnockbackUtils } from '../Utility/KnockbackUtils';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class PandaBash extends Spell {
    protected readonly abilityId: number = FourCC('A03N');
    protected readonly stormEarthAndFireAbilityId: number = FourCC('A047');
    protected readonly entanglingRootsAbilityId: number = FourCC('A08X');
    protected readonly purgeAbilityId: number = FourCC('A08Y');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly knockbackUtils: KnockbackUtils;
    private readonly spellCastUtils: SpellCastUtils;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(knockbackUtils: KnockbackUtils, spellCastUtils: SpellCastUtils, randomNumberGenerator: RandomNumberGenerator) {
        super();

        this.knockbackUtils = knockbackUtils;
        this.spellCastUtils = spellCastUtils;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const stormEarthAndFireAbilityLevel: number = GetUnitAbilityLevel(trig, this.stormEarthAndFireAbilityId);
        const str: number = GetHeroStr(trig, true);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);

        const spellTargetUnit: unit = GetSpellTargetUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const spellTargetX: number = GetUnitX(spellTargetUnit);
        const spellTargetY: number = GetUnitY(spellTargetUnit);
        const dist: number = Math.sqrt(Pow(spellTargetX - x, 2) + Pow(spellTargetY - y, 2));
        const multX: number = 50 * ((spellTargetX - x) / dist);
        const multY: number = 50 * ((spellTargetY - y) / dist);
        
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdl', GetUnitX(spellTargetUnit), GetUnitY(spellTargetUnit)));
        UnitDamageTargetBJ(trig, spellTargetUnit, 70 + abilityLevel * str, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);

        this.knockbackUtils.knockback({
            knockbackTarget: spellTargetUnit,
            targetX: spellTargetX + multX,
            targetY: spellTargetY + multY,
            dist: 400,
            vel: 50,
            onWallHit: undefined,
            onKnockbackEnd: () => {
                if (stormEarthAndFireAbilityLevel > 0) {
                    const rnd = this.randomNumberGenerator.random(1, 3);

                    // Storm
                    if (rnd === 1) {
                        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, spellTargetX, spellTargetY, 0);
                        UnitAddAbility(dummy, this.purgeAbilityId);
                        const duration = 1 + 0.5 * stormEarthAndFireAbilityLevel;
                        BlzSetAbilityRealLevelField(BlzGetUnitAbility(dummy, this.purgeAbilityId), ABILITY_RLF_DURATION_NORMAL, 0, duration);
                        BlzSetAbilityRealLevelField(BlzGetUnitAbility(dummy, this.purgeAbilityId), ABILITY_RLF_DURATION_HERO, 0, duration);
                        BlzSetAbilityRealLevelField(BlzGetUnitAbility(dummy, this.purgeAbilityId), ABILITY_RLF_SUMMONED_UNIT_DAMAGE_CHD3, 0, 125 * stormEarthAndFireAbilityLevel + intelligence);
                        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                        IssueTargetOrder(dummy, 'purge', spellTargetUnit);

                    // Earth
                    } else if (rnd === 2) {
                        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, spellTargetX, spellTargetY, 0);
                        UnitAddAbility(dummy, this.entanglingRootsAbilityId);
                        BlzSetAbilityIntegerLevelField(BlzGetUnitAbility(dummy, this.entanglingRootsAbilityId), ABILITY_ILF_DAMAGE_PER_DURATION, 0, 15 * stormEarthAndFireAbilityLevel + intelligence);
                        UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                        IssueTargetOrder(dummy, 'entanglingroots', spellTargetUnit);

                    // Fire
                    } else {
                        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Doom\\DoomDeath.mdl', GetUnitX(spellTargetUnit), GetUnitY(spellTargetUnit)));
                        UnitDamageTargetBJ(trig, spellTargetUnit, 75 * stormEarthAndFireAbilityLevel + intelligence, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                    }
                }
            }
        });
    }
}
