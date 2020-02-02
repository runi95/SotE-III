import { Boss } from '../Boss';
import { RandomNumberGenerator } from '../../Utility/RandomNumberGenerator';
import { Trigger } from '../../JassOverrides/Trigger';

export class Chaplain extends Boss {
    protected readonly bossId: number = FourCC('n02G');
    protected readonly x: number = -7940.0;
    protected readonly y: number = 14020.0;
    protected readonly angle: number = 0.0;
    private aliveDragonCounter: number = 0;
    private dragonUnitId: number = FourCC('n02H');

    constructor(randomNumberGenerator: RandomNumberGenerator) {
        super(Rect(-8000, 13952, -7872, 14080), randomNumberGenerator);

        const dragonDeathTrigger: Trigger = new Trigger();
        dragonDeathTrigger.addCondition(() => GetUnitTypeId(GetDyingUnit()) === this.dragonUnitId);
        dragonDeathTrigger.addAction(() => this.aliveDragonCounter--);
        dragonDeathTrigger.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    protected spawnCondition(): boolean {
        if (this.aliveDragonCounter !== 0) {
            return false;
        }

        return super.spawnCondition();
    }

    protected spawnAction(): void {
        this.aliveDragonCounter++;
        CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.dragonUnitId, -8030.0, 14146.0, 318.0);

        super.spawnAction();
    }
}
