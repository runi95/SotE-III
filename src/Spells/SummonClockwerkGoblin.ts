import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class SummonClockwerkGoblin extends Spell {
    protected readonly abilityId: number = FourCC('A02C');
    private readonly dummyUnitTypeId: number = FourCC('n017');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, x, y, bj_UNIT_FACING);
        SetUnitUserData(summon, 50 * abilityLevel + intelligence);
        BlzSetUnitMaxHP(summon, 5 * intelligence);
        SetUnitLifePercentBJ(summon, 100);
        BlzSetUnitBaseDamage(summon, intelligence, 0);
        UnitApplyTimedLifeBJ(5, this.timedLifeBuffId, summon);
    }
}
