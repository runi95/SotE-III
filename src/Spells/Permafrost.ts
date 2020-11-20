import { Spell } from './Spell';
import { StunUtils } from '../Utility/StunUtils';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Permafrost extends Spell {
    protected readonly abilityId: number = FourCC('A01I');
    private readonly stunUtils: StunUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(stunUtils: StunUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.stunUtils = stunUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(600.0, loc);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = 60.0 * abilityLevel + intelligence;

        grp.for((u: unit) => {
            if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                this.stunUtils.stunUnit(u, 2);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
