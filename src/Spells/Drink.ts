import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class Drink extends Spell {
    protected readonly abilityId: number = FourCC('A037');
    protected readonly stormEarthAndFireAbilityId: number = FourCC('A047');
    private readonly invisibilityAbilityId: number = FourCC('A08Z');
    private readonly innerFireAbilityId: number = FourCC('A090');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly spellCastUtils: SpellCastUtils;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(spellCastUtils: SpellCastUtils, randomNumberGenerator: RandomNumberGenerator) {
        super();

        this.spellCastUtils = spellCastUtils;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const stormEarthAndFireAbilityLevel: number = GetUnitAbilityLevel(trig, this.stormEarthAndFireAbilityId);
        let healthRegained: number = 120 + 2 * intelligence;

        if (stormEarthAndFireAbilityLevel > 0) {
            const rnd = this.randomNumberGenerator.random(1, 3);

            // Storm
            if (rnd === 1) {
                const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, GetUnitX(trig), GetUnitY(trig), 0);
                UnitAddAbility(dummy, this.invisibilityAbilityId);
                const duration = 1 + 0.5 * stormEarthAndFireAbilityLevel;
                BlzSetAbilityRealLevelField(BlzGetUnitAbility(dummy, this.invisibilityAbilityId), ABILITY_RLF_DURATION_HERO, 0, duration);
                UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                IssueTargetOrder(dummy, 'invisibility', trig);

            // Earth
            } else if (rnd === 2) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\HolyBolt\\HolyBoltSpecialArt.mdl', GetUnitX(trig), GetUnitY(trig)));
                healthRegained += (75 * stormEarthAndFireAbilityLevel + intelligence);

            // Fire
            } else {
                const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, GetUnitX(trig), GetUnitY(trig), 0);
                UnitAddAbility(dummy, this.innerFireAbilityId);
                BlzSetAbilityIntegerLevelField(BlzGetUnitAbility(dummy, this.innerFireAbilityId), ABILITY_ILF_DEFENSE_INCREASE_INF2, 0, stormEarthAndFireAbilityLevel);
                UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                IssueTargetOrder(dummy, 'innerfire', trig);
            }
        }

        SetUnitLifeBJ(trig,
            GetUnitState(trig, UNIT_STATE_LIFE) + healthRegained);
    }
}
