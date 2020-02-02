import { Boss } from '../Boss';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';
import { TimerUtils } from '../../Utility/TimerUtils';
import { Timer } from '../../JassOverrides/Timer';

export class InfernalJuggernaut extends Boss {
    protected readonly bossId: number = FourCC('n02I');
    protected readonly x: number = 14654.0;
    protected readonly y: number = -15160.0;
    protected readonly angle: number = 150.0;
    private readonly timerUtils: TimerUtils;
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A05Q');
    private readonly timedLifeBuffId: number = FourCC('BTLF');

    constructor(timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(14592, -15232, 14720, -15104), randomNumberGenerator);
        this.timerUtils = timerUtils;
    }

    protected spawnAction(): void {
        const t: Timer = this.timerUtils.newTimer();
        let ticks: number = 4;
        t.start(3, true, () => {
            ticks--;

            const dummy: unit = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.dummyUnitTypeId, this.x, this.y, 0);
            UnitAddAbilityBJ(this.dummyAbilityId, dummy);
            UnitApplyTimedLifeBJ(2, this.timedLifeBuffId, dummy);
            IssuePointOrder(dummy, 'inferno', this.x, this.y);

            if (ticks <= 0) {
                this.timerUtils.releaseTimer(t);
            }
        });

        super.spawnAction();
    }
}
