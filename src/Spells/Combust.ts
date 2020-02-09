import { Trigger } from '../JassOverrides/Trigger';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class Combust {
    private readonly abilityId: number = FourCC('A008');
    private readonly trig: Trigger = new Trigger();

    constructor() {
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
        const intelligence: number = GetHeroInt(trig, true);
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
