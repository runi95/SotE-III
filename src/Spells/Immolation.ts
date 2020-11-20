import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';
import { SpellCastUtils } from '../Utility/SpellCastUtils';

export class Immolation extends Spell {
    protected readonly abilityId: number = FourCC('A00K');
    private readonly timerUtils: TimerUtils;
    private readonly spellCastUtils: SpellCastUtils;

    constructor(timerUtils: TimerUtils, spellCastUtils: SpellCastUtils) {
        super();

        this.timerUtils = timerUtils;
        this.spellCastUtils = spellCastUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = this.spellCastUtils.GetIntelligence(trig);
        const damage: number = 50 * abilityLevel + 1.5 * intelligence;

        let ticks: number = 20;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.5, true, () => {
            ticks--;
            const loc: location = GetUnitLoc(trig);
            const grp: GroupInRange = new GroupInRange(256, loc);
            grp.for((u: unit) => {
                if (IsUnitEnemy(u, GetOwningPlayer(trig)) && UnitAlive(u)) {
                    DestroyEffect(
                        AddSpecialEffect('Abilities\\Spells\\NightElf\\Immolation\\ImmolationDamage.mdl', GetUnitX(u), GetUnitY(u)),
                    );
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
