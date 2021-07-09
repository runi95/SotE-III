import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class Devour extends Spell {
    protected readonly abilityId: number = FourCC('A00A');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(300.0, loc);
        const damage: number = 75 + 2 * GetHeroStr(GetTriggerUnit(), true);
        grp.for((u: unit) => {
            if (UnitAlive(u) && u !== trig) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl', GetUnitX(u), GetUnitY(u)));
                UnitDamageTargetBJ(GetTriggerUnit(), u, damage, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
                SetUnitLifeBJ(GetTriggerUnit(), GetUnitState(GetTriggerUnit(), UNIT_STATE_LIFE) + damage);
            }
        });
        RemoveLocation(loc);
        grp.destroy();
    }
}
