import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class Devour extends Spell {
    protected readonly abilityId: number = FourCC('A00A');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(300.00, loc);
        const damage: number = 3 * GetHeroStr(GetTriggerUnit(), true);
        grp.for((u: unit) => {
            if (UnitAlive(u)) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                                               GetUnitX(u), GetUnitY(u)));
                UnitDamageTargetBJ(GetTriggerUnit(), u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                SetUnitLifeBJ(GetTriggerUnit(), GetUnitState(GetTriggerUnit(), UNIT_STATE_LIFE) + damage);
            }
        });
        RemoveLocation(loc);
        grp.destroy();
    }
}
