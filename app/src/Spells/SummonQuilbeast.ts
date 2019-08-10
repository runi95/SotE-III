import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class SummonQuilbeast extends Spell {
    protected readonly abilityId: number = FourCC('A00Q');
    private readonly summonId: number = FourCC('n00C');
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
        const agi: number = GetHeroAgi(trig, true);
        const summon: unit = CreateUnit(GetOwningPlayer(trig), this.summonId, x, y, bj_UNIT_FACING);

        BlzSetUnitMaxHP(summon, 15 * agi);
        SetUnitLifePercentBJ(summon, 100);
        // BlzSetUnitArmor( summon, 10.00 )
        // BlzSetUnitAttackCooldown(summon, 2.00, 1)
        // BlzSetUnitDiceSides(summon, 1, 1)
        // BlzSetUnitDiceNumber(summon, 4, 1)
        BlzSetUnitBaseDamage(summon, Math.ceil(0.90 * agi), 1);
        // UnitApplyTimedLifeBJ(60, 'BTLF', summon)

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
