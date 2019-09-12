import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class PandarenChi extends Spell {
    protected readonly abilityId: number = FourCC('A03J');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const loc: location = GetUnitLoc(trig);
        const p: player = GetOwningPlayer(trig);
        const abilityLevel: number = GetUnitAbilityLevel(trig, this.abilityId);
        const intelligence: number = GetHeroInt(GetTriggerUnit(), true);
        const damagePerTick: number = (75 * abilityLevel + 1.5 * intelligence) / 20;
        const healingPerTick: number = (50 * abilityLevel + 1.5 * intelligence) / 20;
        const eff: effect = AddSpecialEffectLoc('Abilities\\Spells\\NightElf\\Tranquility\\Tranquility.mdl', loc);

        let ticks: number = 20;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;

            const grp: GroupInRange = new GroupInRange(450, loc);
            grp.for((u: unit) => {
                if (UnitAlive(u)) {
                    if (IsUnitEnemy(u, p)) {
                        DestroyEffect(
                            AddSpecialEffect('Abilities\\Spells\\NightElf\\ManaBurn\\ManaBurnTarget.mdl', GetUnitX(u), GetUnitY(u)),
                        );
                        UnitDamageTargetBJ(trig, u, damagePerTick, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                    } else {
                        DestroyEffect(
                            AddSpecialEffect('Abilities\\Spells\\NightElf\\Tranquility\\TranquilityTarget.mdl', GetUnitX(u), GetUnitY(u)),
                        );
                        SetUnitLifeBJ(u, GetUnitState(u, UNIT_STATE_LIFE) + healingPerTick);
                    }
                }
            });

            if (ticks <= 0) {
                DestroyEffect(eff);
                RemoveLocation(loc);

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
