import { Trigger } from '../JassOverrides/Trigger';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Combust {
    private readonly abilityId: number = FourCC('A008');
    private readonly trig: Trigger = new Trigger();
    private readonly spellCastUtils: SpellCastUtils;

    constructor(spellCastUtils: SpellCastUtils) {
        this.spellCastUtils = spellCastUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return GetUnitAbilityLevel(GetKillingUnit(), this.abilityId) > 0;
    }

    private action(): void {
        const trig: unit = GetKillingUnit();
        const mana: number = GetUnitState(trig, UNIT_STATE_MANA);
        if (mana < 10) {
            return;
        }

        SetUnitState(trig, UNIT_STATE_MANA, mana - 10);

        const loc: location = GetUnitLoc(GetDyingUnit());
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = 100 + intelligence;
        const grp: GroupInRange = new GroupInRange(150, loc);
        DestroyEffect(AddSpecialEffectLoc('Objects\\Spawnmodels\\Human\\HCancelDeath\\HCancelDeath.mdl', loc));

        grp.for((u: unit) => {
            if (IsUnitEnemy(u, GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
