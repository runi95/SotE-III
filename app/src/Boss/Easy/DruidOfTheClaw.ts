import { Boss } from '../Boss';
import { Trigger } from '../../JassOverrides/Trigger';

export class DruidOfTheClaw extends Boss {
    private readonly huntressUnitId: number = FourCC('e002');
    private aliveHuntressCounter: number = 0;
    protected readonly bossId: number = FourCC('n015');
    protected readonly x: number = -578.0;
    protected readonly y: number = 14020.0;
    protected readonly angle: number = 265.0;
    protected readonly lootItemId: number = FourCC('I00A'); // Green Soulstone

    constructor() {
        super(Rect(-608, 13984, -544, 14048));

        const huntressDeathTrigger: Trigger = new Trigger();
        huntressDeathTrigger.addCondition(() => GetUnitTypeId(GetDyingUnit()) === this.huntressUnitId);
        huntressDeathTrigger.addAction(() => this.aliveHuntressCounter--);
        huntressDeathTrigger.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    protected spawnCondition(): boolean {
        if (this.aliveHuntressCounter !== 0) {
            return false;
        }

        return super.spawnCondition();
    }

    protected spawnAction(): void {
        this.aliveHuntressCounter = 2;
        CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.huntressUnitId, -797.0, 14020.0, 265.0);
        CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.huntressUnitId, -359.0, 14020.0, 265.0);

        super.spawnAction();
    }
}
