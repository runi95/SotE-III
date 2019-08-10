import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class ToArms extends Spell {
    protected readonly abilityId: number = FourCC('A030');
    private readonly summonId: number = FourCC('n01P');
    private isSummonAlive: boolean = false;
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        if (this.isSummonAlive) {
            return;
        }

        this.isSummonAlive = true;

        const trig: unit = GetTriggerUnit();
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const str: number = GetHeroStr(trig, true);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.summonId, x, y, bj_UNIT_FACING);

        BlzSetUnitMaxHP(summon, 10 * str);
        SetUnitLifePercentBJ(summon, 100);
        BlzSetUnitArmor(summon, str / 10);
        BlzSetUnitAttackCooldown(summon, 1.00 - (str * 0.06) / (5 + (str * 0.06)), 1);
        BlzSetUnitBaseDamage(summon, Math.ceil(0.80 * str), 0);

        const maxDistance: number = 1200;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            const newX: number = GetUnitX(trig);
            const newY: number = GetUnitY(trig);
            const distance: number = Math.sqrt(Pow(GetUnitX(summon) - newX, 2) + Pow(GetUnitY(summon) - newY, 2));

            if (distance > maxDistance) {
                SetUnitPosition(summon, newX, newY);
                IssueTargetOrderBJ(summon, 'move', trig);
            }

            if (!UnitAlive(summon)) {
                this.isSummonAlive = false;
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
