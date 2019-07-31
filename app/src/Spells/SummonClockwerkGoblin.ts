import { Spell } from './Spell';

export class SummonClockwerkGoblin extends Spell {
    protected readonly abilityId: number = FourCC('A02C');
    private readonly dummyUnitTypeId: number = FourCC('n017');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, x, y, bj_UNIT_FACING);
        SetUnitUserData(summon, 50 * abilityLevel + intelligence);
        BlzSetUnitMaxHP(summon, 5 * intelligence);
        SetUnitLifePercentBJ(summon, 100);
        BlzSetUnitBaseDamage(summon, R2I(intelligence), 1);
        UnitApplyTimedLifeBJ(5, this.timedLifeBuffId, summon);
    }
}
