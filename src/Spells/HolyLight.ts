import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class HolyLight extends Spell {
    protected readonly abilityId: number = FourCC('A031');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const healing: number = 175 * abilityLevel + 3 * intelligence;

        SetUnitLifeBJ(targ, GetUnitState(targ, UNIT_STATE_LIFE) + healing);
    }
}
