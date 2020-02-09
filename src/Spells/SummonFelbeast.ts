import { Spell } from './Spell';

export class SummonFelbeast extends Spell {
    protected readonly abilityId: number = FourCC('A013');
    private readonly summonId: number = FourCC('n00F');
    private readonly shadowMeldAbilityId: number = FourCC('A04G');
    private readonly cleavingAttackAbilityId: number = FourCC('A014');
    private readonly bashAbilityId: number = FourCC('A04F');
    private readonly criticalStrikeAbilityId: number = FourCC('A04E');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const x: number = GetUnitX(GetTriggerUnit());
        const y: number = GetUnitY(GetTriggerUnit());
        const abilityLevel: number = GetUnitAbilityLevel(GetTriggerUnit(), this.abilityId);
        const str: number = GetHeroStr(GetTriggerUnit(), true);
        const summon: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.summonId, x, y, bj_UNIT_FACING);

        BlzSetUnitMaxHP(summon, 100 * abilityLevel + 10 * str);
        SetUnitLifePercentBJ(summon, 100);
        BlzSetUnitBaseDamage(summon, Math.ceil(3 * abilityLevel + str), 0);
        UnitApplyTimedLifeBJ(60, this.timedLifeBuffId, summon);
        UnitAddAbility(summon, this.shadowMeldAbilityId);

        if (abilityLevel > 2) {
            UnitAddAbility(summon, this.cleavingAttackAbilityId);
        }

        if (abilityLevel > 4) {
            UnitAddAbility(summon, this.bashAbilityId);
        }

        if (abilityLevel > 7) {
            UnitAddAbility(summon, this.criticalStrikeAbilityId);
        }

        UnitDamageTargetBJ(GetTriggerUnit(), GetTriggerUnit(), 100, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
    }
}
