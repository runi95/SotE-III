import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Immolation extends Spell {
    protected readonly abilityId: number = FourCC('A00K');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(GetTriggerUnit(), true);
        const damage: number = 100 * abilityLevel + 3 * intelligence;

        let ticks: number = 10;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(1, true, () => {
            ticks--;
            const loc: location = GetUnitLoc(trig);
            const grp: group = GetUnitsInRangeOfLocAll(128, loc);
            ForGroup(grp, () => {
                if (IsUnitEnemy(GetEnumUnit(), GetOwningPlayer(trig)) && UnitAlive(GetEnumUnit())) {
                    DestroyEffect(AddSpecialEffect('Abilities\\Spells\\NightElf\\Immolation\\ImmolationDamage.mdl',
                                                   GetUnitX(GetEnumUnit()), GetUnitY(GetEnumUnit())));
                    UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            DestroyGroup(grp);
            RemoveLocation(loc);

            if (ticks <= 0) {
                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
