import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

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
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;
            const loc: location = GetUnitLoc(trig);
            const grp: GroupInRange = new GroupInRange(128, loc);
            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig)) && UnitAlive(u)) {
                    DestroyEffect(AddSpecialEffect('Abilities\\Spells\\NightElf\\Immolation\\ImmolationDamage.mdl',
                                                   GetUnitX(u), GetUnitY(u)));
                    UnitDamageTargetBJ(trig, u, damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                }
            });

            RemoveLocation(loc);
            grp.destroy();

            if (ticks <= 0) {
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
