import { Spell } from './Spell';

export class SummonFelbeast extends Spell {
    protected readonly abilityId: number = FourCC('A013');
    private readonly summonId: number = FourCC('n00F');
    private readonly summonAbilityId: number = FourCC('A014');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const x: number = GetUnitX(GetTriggerUnit());
        const y: number = GetUnitY(GetTriggerUnit());
        const abilityLevel: number = GetUnitAbilityLevelSwapped(this.abilityId, GetTriggerUnit());
        const str: number = GetHeroStr(GetTriggerUnit(), true);
        const summon: unit = CreateUnit(GetOwningPlayer(GetTriggerUnit()), this.summonId, x, y, bj_UNIT_FACING);

        BlzSetUnitMaxHP(summon, 10 * str);
        SetUnitLifePercentBJ(summon, 100);
        // BlzSetUnitArmor( summon, 10.00 )
        // BlzSetUnitAttackCooldown(summon, 2.00, 1)
        // BlzSetUnitDiceSides(summon, 1, 1)
        // BlzSetUnitDiceNumber(summon, 4, 1)
        BlzSetUnitBaseDamage(summon, str, 1);
        UnitApplyTimedLifeBJ(60, this.timedLifeBuffId, summon);

        if (abilityLevel > 2) {
            UnitAddAbilityBJ(this.summonAbilityId, summon);
        }

        UnitDamageTargetBJ(GetTriggerUnit(), GetTriggerUnit(), 100, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
    }
}
