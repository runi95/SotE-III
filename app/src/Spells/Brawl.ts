import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class Brawl extends Spell {
    protected readonly abilityId: number = FourCC('A03I');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const bonusDamage: number = 300 * abilityLevel + 4 * intelligence;
        const damage: number = BlzGetUnitBaseDamage(trig, 0) + bonusDamage;
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\FlakCannons\\FlakTarget.mdl', x, y));
        const loc: location = Location(x, y);
        const grp: GroupInRange = new GroupInRange(600, loc);
        grp.for((u: unit) => {
            if (u !== trig && UnitAlive(u)) {
                const baseDamage: number = BlzGetUnitBaseDamage(u, 0);
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\FlakCannons\\FlakTarget.mdl', GetUnitX(u), GetUnitY(u)));
                UnitDamageTargetBJ(u, trig, baseDamage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            }
        });
    }
}
