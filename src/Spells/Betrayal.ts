import { SpellCastUtils } from '../Utility/SpellCastUtils';
import { Spell } from './Spell';

export class Betrayal extends Spell {
    protected readonly abilityId: number = FourCC('A00H');
    private readonly buffId: number = FourCC('Beng');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected condition(): boolean {
        return super.condition() && !UnitHasBuffBJ(GetTriggerUnit(), this.buffId);
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const targ: unit = GetSpellTargetUnit();
        const targFacingDirection: number = GetUnitFacing(targ);
        const abilityLevel: number = GetUnitAbilityLevel(trig, FourCC('A00H'));
        const damage: number = 75.0 * abilityLevel + 3 * this.spellCastUtils.GetIntelligence(trig);
        const newX: number = GetUnitX(targ) + CosBJ(targFacingDirection) * -75;
        const newY: number = GetUnitY(targ) + SinBJ(targFacingDirection) * -75;

        TriggerSleepAction(0.05);

        SetUnitPosition(trig, newX, newY);
        UnitDamageTargetBJ(trig, targ, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
        SetUnitFacing(trig, targFacingDirection);
    }
}
