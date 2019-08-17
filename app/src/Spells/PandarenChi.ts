import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class PandarenChi extends Spell {
    protected readonly abilityId: number = FourCC('A03J');
    private readonly dummyUnitId: number = FourCC('n020');
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
        const damagePerTick: number = (75 * abilityLevel + intelligence) / 20;
        const healingPerTick: number = (50 * abilityLevel + intelligence) / 20;
        const dummy: unit = CreateUnitAtLoc(p, this.dummyUnitId, loc, bj_UNIT_FACING);

        let ticks: number = 20;
        const t: Timer = this.timerUtils.newTimer();
        t.start(0.50, true, () => {
            ticks--;

            const grp: GroupInRange = new GroupInRange(600, loc);
            grp.for((u: unit) => {
                if (UnitAlive(u)) {
                    if (IsUnitEnemy(u, p)) {
                        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Stampede\\StampedeMissileDeath.mdl',
                                                       GetUnitX(u), GetUnitY(u)));
                        UnitDamageTargetBJ(trig, u, damagePerTick, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                    } else {
                        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\NightElf\\Tranquility\\TranquilityTarget.mdl',
                                                       GetUnitX(u), GetUnitY(u)));
                        SetUnitLifeBJ(u, GetUnitStateSwap(UNIT_STATE_LIFE, u) + healingPerTick);
                    }
                }
            });

            if (ticks <= 0) {
                RemoveUnit(dummy);
                RemoveLocation(loc);

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
