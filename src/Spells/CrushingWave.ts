import { Spell } from './Spell';
import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { StunUtils } from '../Utility/StunUtils';

export class CrushingWave extends Spell {
    protected readonly abilityId: number = FourCC('A00O');
    private readonly spellCastUtils: SpellCastUtils;
    private readonly stunUtils: StunUtils;

    constructor(spellCastUtils: SpellCastUtils, stunUtils: StunUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
        this.stunUtils = stunUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const damage: number = 150 * abilityLevel + intelligence;

        DestroyEffect(AddSpecialEffect('Objects\\Spawnmodels\\Naga\\NagaDeath\\NagaDeath.mdl', GetUnitX(targ), GetUnitY(targ)));
        UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        this.stunUtils.stunUnit(targ, 1.5);
    }
}
