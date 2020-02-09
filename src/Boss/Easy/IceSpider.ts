import { Boss } from '../Boss';
import { TimerUtils } from '../../Utility/TimerUtils';
import { Timer } from '../../JassOverrides/Timer';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';

export class IceSpider extends Boss {
    protected readonly bossId: number = FourCC('n02C');
    protected readonly x: number = 14169.0;
    protected readonly y: number = 579.0;
    protected readonly angle: number = 280.0;
    protected readonly dropTable: number[] = [FourCC('I00C')]; // Purple Soulstone (1700)
    private readonly timerUtils: TimerUtils;
    private timer: Timer | undefined;
    private iceSpider: unit | undefined;
    private readonly eggSackId: number = FourCC('e003');
    private readonly eggSacks: unit[] = [];
    private readonly spiderlingId: number = FourCC('u006');

    constructor(timerUtils: TimerUtils, randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(14208, 384, 14336, 512), randomNumberGenerator);

        this.timerUtils = timerUtils;
    }

    protected spawnCondition(): boolean {
        if (!IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO)) {
            return false;
        }

        if (this.eggSacks.length > 0) {
            return false;
        }

        return this.iceSpider === undefined;
    }

    protected spawnAction(): void {
        this.iceSpider = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.bossId, this.x, this.y, this.angle);

        this.timer = this.timerUtils.newTimer();
        this.timer.start(1, true, () => {
            if (this.iceSpider && GetUnitManaPercent(this.iceSpider) === 100) {
                SetUnitManaPercentBJ(this.iceSpider, 0);
                this.eggSacks.push(
                    CreateUnit(
                        Player(PLAYER_NEUTRAL_AGGRESSIVE),
                        this.eggSackId,
                        GetUnitX(this.iceSpider) + this.randomNumberGenerator.random(0, 200) - 100,
                        GetUnitY(this.iceSpider) + this.randomNumberGenerator.random(0, 200) - 100,
                        0,
                    ),
                );
            }

            for (let i: number = 0; i < this.eggSacks.length; i++) {
                const currentMana: number = GetUnitState(this.eggSacks[i], UNIT_STATE_MANA) - 1;
                if (currentMana > 0) {
                    SetUnitManaBJ(this.eggSacks[i], currentMana);
                } else {
                    const x: number = GetUnitX(this.eggSacks[i]);
                    const y: number = GetUnitY(this.eggSacks[i]);
                    RemoveUnit(this.eggSacks[i]);
                    this.eggSacks.splice(i, 1);

                    CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.spiderlingId, x, y, 0);
                    CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.spiderlingId, x, y, 0);
                }
            }
        });
    }

    protected deathCondition(): boolean {
        return GetUnitTypeId(GetTriggerUnit()) === this.eggSackId || GetTriggerUnit() === this.iceSpider;
    }

    protected deathAction(): void {
        if (GetTriggerUnit() === this.iceSpider) {
            this.iceSpider = undefined;
            super.deathAction();
        }

        if (this.iceSpider === undefined && this.eggSacks.length === 0) {
            if (this.timer !== undefined) {
                this.timerUtils.releaseTimer(this.timer);
                this.timer = undefined;
            }
        }
    }
}
