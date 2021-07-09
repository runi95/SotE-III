import { Spell } from './Spell';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class AbolishLight extends Spell {
    protected readonly abilityId: number = FourCC('A04C');
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        super();

        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const totalDamageAndHealing: number = 125 * abilityLevel + 2 * intelligence;

        const loc: location = GetUnitLoc(trig);
        const grp: GroupInRange = new GroupInRange(600, loc);
        const allies: unit[] = [];
        const enemies: unit[] = [];
        grp.for((u: unit) => {
            if (IsUnitAlly(u, GetOwningPlayer(trig))) {
                allies.push(u);
            } else {
                enemies.push(u);
            }
        });
        grp.destroy();
        RemoveLocation(loc);

        const fractionedDamageAndHealing: number = totalDamageAndHealing / (allies.length + enemies.length);
        for (let i = 0; i < allies.length; i++) {
            SetUnitState(allies[i], UNIT_STATE_LIFE, GetUnitState(allies[i], UNIT_STATE_LIFE) + fractionedDamageAndHealing);
            DestroyEffect(AddSpecialEffectTarget('Abilities\\Spells\\Undead\\DeathCoil\\DeathCoilSpecialArt.mdl', allies[i], 'origin'));
        }

        for (let i = 0; i < enemies.length; i++) {
            UnitDamageTargetBJ(trig, enemies[i], fractionedDamageAndHealing, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
            DestroyEffect(AddSpecialEffectTarget('Abilities\\Spells\\Undead\\DeathCoil\\DeathCoilSpecialArt.mdl', enemies[i], 'origin'));
        }
    }
}
