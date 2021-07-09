import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';

export class PandarenChi extends Spell {
    protected readonly abilityId: number = FourCC('A03J');
    protected readonly stormEarthAndFireAbilityId: number = FourCC('A047');
    private readonly monsoonAbilityId: number = FourCC('A092');
    private readonly warStompAbilityId: number = FourCC('A091');
    private readonly permanentImmolationAbilityId: number = FourCC('A093');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;
    private readonly damageEngineGlobals: DamageEngineGlobals;
    private readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils, damageEngineGlobals: DamageEngineGlobals, randomNumberGenerator: RandomNumberGenerator) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
        this.damageEngineGlobals = damageEngineGlobals;
        this.randomNumberGenerator = randomNumberGenerator;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const p: player = GetOwningPlayer(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const stormEarthAndFireAbilityLevel: number = GetUnitAbilityLevel(trig, this.stormEarthAndFireAbilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damagePerTick: number = Math.ceil((200 * abilityLevel + 1.5 * intelligence) / 10);
        const healingPerTick: number = Math.ceil((75 * abilityLevel + 1.5 * intelligence) / 10);
        const eff: effect = AddSpecialEffectLoc('Abilities\\Spells\\NightElf\\Tranquility\\Tranquility.mdl', loc);

        let ticks = 40;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.5, true, () => {
            ticks--;

            const grp: GroupInRange = new GroupInRange(450, loc);
            grp.for((u: unit) => {
                if (UnitAlive(u)) {
                    if (ticks % 4 === 0 && IsUnitEnemy(u, p)) {
                        DestroyEffect(
                            AddSpecialEffect('Abilities\\Spells\\NightElf\\ManaBurn\\ManaBurnTarget.mdl', GetUnitX(u), GetUnitY(u)),
                        );
                        this.damageEngineGlobals.NextDefensiveReduction = 0.9;
                        UnitDamageTargetBJ(trig, u, damagePerTick, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                    }

                    if (IsUnitAlly(u, p)) {
                        DestroyEffect(
                            AddSpecialEffect('Abilities\\Spells\\NightElf\\Tranquility\\TranquilityTarget.mdl', GetUnitX(u), GetUnitY(u)),
                        );
                        SetUnitLifeBJ(u, GetUnitState(u, UNIT_STATE_LIFE) + healingPerTick);
                    }
                }
            });
            grp.destroy();

            if (ticks <= 0) {
                DestroyEffect(eff);
                RemoveLocation(loc);
                UnitRemoveAbility(trig, this.permanentImmolationAbilityId);

                this.timerUtils.releaseTimer(t);
            }
        });

        if (stormEarthAndFireAbilityLevel > 0) {
            const rnd = this.randomNumberGenerator.random(1, 3);

            // Storm
            if (rnd === 1) {
                const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, GetUnitX(trig), GetUnitY(trig), 0);
                UnitAddAbility(dummy, this.monsoonAbilityId);
                BlzSetAbilityRealLevelField(BlzGetUnitAbility(dummy, this.monsoonAbilityId), ABILITY_RLF_AREA_OF_EFFECT_DAMAGE, 0, 20 * stormEarthAndFireAbilityLevel + 2 * intelligence);
                UnitApplyTimedLifeBJ(15, this.timedLifeBuffId, dummy);
                IssuePointOrder(dummy, 'monsoon', GetUnitX(trig), GetUnitY(trig));

            // Earth
            } else if (rnd === 2) {
                const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, GetUnitX(trig), GetUnitY(trig), 0);
                UnitAddAbility(dummy, this.warStompAbilityId);
                BlzSetAbilityRealLevelField(BlzGetUnitAbility(dummy, this.warStompAbilityId), ABILITY_RLF_AREA_OF_EFFECT_DAMAGE, 0, 50 * stormEarthAndFireAbilityLevel + intelligence);
                UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
                IssueImmediateOrder(dummy, 'stomp');
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Orc\\WarStomp\\WarStompCaster.mdl', GetUnitX(trig), GetUnitY(trig)));

            // Fire
            } else {
                UnitAddAbility(trig, this.permanentImmolationAbilityId);
                BlzUnitDisableAbility(trig, this.permanentImmolationAbilityId, true, true);
                BlzSetAbilityRealLevelField(BlzGetUnitAbility(trig, this.permanentImmolationAbilityId), ABILITY_RLF_DAMAGE_PER_INTERVAL, 0, 5 * stormEarthAndFireAbilityLevel + 0.5 * intelligence);
                BlzUnitDisableAbility(trig, this.permanentImmolationAbilityId, false, true);
            }
        }
    }
}
