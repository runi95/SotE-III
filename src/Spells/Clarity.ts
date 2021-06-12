import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class Clarity extends Spell {
    protected readonly abilityId: number = FourCC('A00M');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        SetUnitManaBJ(GetTriggerUnit(),
                      GetUnitState(GetTriggerUnit(), UNIT_STATE_MANA) + 100 + 1.5 * this.spellCastUtils.GetIntelligence(GetTriggerUnit()));
    }
}
