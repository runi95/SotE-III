import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class GoblinMine extends Spell {
    protected readonly abilityId: number = FourCC('A02E');
    private readonly dummyUnitTypeId: number = FourCC('n018');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetSpellTargetX();
        const y: number = GetSpellTargetY();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(trig, true);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, x, y, bj_UNIT_FACING);
        const damage: number = 100 * abilityLevel + 2 * intelligence;

        const t: Timer = this.timerUtils.NewTimer();
        t.start(2, false, () => {
            const loc: location = GetUnitLoc(summon);
            const grp: group = GetUnitsInRangeOfLocAll(300.00, loc);

            DestroyEffect(AddSpecialEffect('Objects\\Spawnmodels\\Human\\HCancelDeath\\HCancelDeath.mdl',
                                           GetUnitX(summon), GetUnitY(summon)));
            DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\FlameStrike\\FlameStrike1.mdl',
                                           GetUnitX(summon), GetUnitY(summon)));

            ForGroup(grp, () => {
                if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig)) && UnitAlive(GetEnumUnit())) {
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveUnit(summon);
            RemoveLocation(loc);
            DestroyGroup(grp);

            this.timerUtils.ReleaseTimer(t);
        });
    }
}
