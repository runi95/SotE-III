import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class Drink extends Spell {
    protected readonly abilityId: number = FourCC('A037');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        SetUnitLifeBJ(GetTriggerUnit(),
                      GetUnitState(GetTriggerUnit(), UNIT_STATE_LIFE) + 2 * this.spellCastUtils.GetIntelligence(GetTriggerUnit()));
    }
}
