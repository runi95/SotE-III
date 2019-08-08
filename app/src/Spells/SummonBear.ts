import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class SummonBear extends Spell {
    protected readonly abilityId: number = FourCC('A00P');
    private readonly summonId: number = FourCC('n00B');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const str: number = GetHeroStr(trig, true);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.summonId, x, y, bj_UNIT_FACING);

        BlzSetUnitMaxHP(summon, 25 * str);
        SetUnitLifePercentBJ(summon, 100);
        // BlzSetUnitArmor( summon, 10.00 )
        // BlzSetUnitAttackCooldown(summon, 2.00, 1)
        // BlzSetUnitDiceSides(summon, 1, 1)
        // BlzSetUnitDiceNumber(summon, 4, 1)
        BlzSetUnitBaseDamage(summon, Math.ceil(0.50 * str), 1);
        // UnitApplyTimedLifeBJ(60, 'BTLF', summon)

        const maxDistance: number = 1200;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(1, true, () => {
            const newX: number = GetUnitX(trig);
            const newY: number = GetUnitY(trig);
            const distance: number = Math.sqrt(Pow(GetUnitX(summon) - newX, 2) + Pow(GetUnitY(summon) - newY, 2));

            if (distance > maxDistance) {
                SetUnitPosition(summon, newX, newY);
                IssueTargetOrderBJ(summon, 'move', trig);
            }

            if (!UnitAlive(summon)) {
                this.timerUtils.ReleaseTimer(t);
            }
        });
    }
}
