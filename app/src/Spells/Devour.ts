import { Spell } from './Spell';

export class Devour extends Spell {
    protected abilityId: number = FourCC('A00A');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const grp: group = GetUnitsInRangeOfLocAll(300.00, loc);
        const damage: number = 3 * GetHeroStr(GetTriggerUnit(), true);
        ForGroup(grp, () => {
            if (IsUnitAliveBJ(GetEnumUnit())) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Demon\\DarkPortal\\DarkPortalTarget.mdl',
                                               GetUnitX(GetEnumUnit()), GetUnitY(GetEnumUnit())));
                UnitDamageTargetBJ(GetTriggerUnit(), GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                SetUnitLifeBJ(GetTriggerUnit(), GetUnitStateSwap(UNIT_STATE_LIFE, GetTriggerUnit()) + damage);
            }
        });
        RemoveLocation(loc);
        DestroyGroup(grp);
    }
}
