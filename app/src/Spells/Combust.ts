import { Trigger } from '../JassOverrides/Trigger';

export class Combust {
    private readonly abilityId: number = FourCC('A008');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return GetUnitAbilityLevel(GetKillingUnit(), this.abilityId) > 0;
    }

    private action(): void {
        const trig: unit = GetKillingUnit();
        const loc: location = GetUnitLoc(GetDyingUnit());
        const intelligence: number = GetHeroInt(trig, true);
        const damage: number = 100 + intelligence;
        const grp: group = GetUnitsInRangeOfLocAll(150, loc);
        DestroyEffect(AddSpecialEffectLoc('Objects\\Spawnmodels\\Human\\HCancelDeath\\HCancelDeath.mdl', loc));

        ForGroup(grp, () => {
            if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig))) {
                UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            }
        });

        RemoveLocation(loc);
        DestroyGroup(grp);
    }
}
