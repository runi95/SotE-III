import { Spell } from './Spell';
import { StunUtils } from '../Utility/StunUtils';

export class Permafrost extends Spell {
    protected abilityId: number = FourCC('A01I');
    private stunUtils: StunUtils;

    constructor(stunUtils: StunUtils) {
        super();

        this.stunUtils = stunUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const grp: group = GetUnitsInRangeOfLocAll(1000.00, loc);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const damage: number = 50.00 * abilityLevel + 1.00 * intelligence;

        ForGroup(grp, () => {
            if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                this.stunUtils.StunUnit(GetEnumUnit(), 2);
            }
        });

        RemoveLocation(loc);
        DestroyGroup(grp);
    }
}
