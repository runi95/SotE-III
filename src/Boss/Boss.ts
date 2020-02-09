import { Trigger } from '../JassOverrides/Trigger';
import { RandomNumberGenerator } from '../Utility/RandomNumberGenerator';

export abstract class Boss {
    protected abstract readonly bossId: number;
    protected abstract readonly x: number;
    protected abstract readonly y: number;
    protected abstract readonly angle: number;
    protected readonly dropTable: number[] = [];
    protected bossHandleId: number | undefined = undefined;
    protected readonly spawnTrig: Trigger = new Trigger();
    protected readonly deathTrig: Trigger = new Trigger();
    protected readonly randomNumberGenerator: RandomNumberGenerator;

    constructor(spawnRect: rect, randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
        this.spawnTrig.addCondition(() => this.spawnCondition());
        this.spawnTrig.addAction(() => this.spawnAction());
        this.spawnTrig.registerEnterRectSimple(spawnRect);

        this.deathTrig.addCondition(() => this.deathCondition());
        this.deathTrig.addAction(() => this.deathAction());
        this.deathTrig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    protected spawnCondition(): boolean {
        if (!IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO)) {
            return false;
        }

        return this.bossHandleId === undefined;
    }

    protected spawnAction(): void {
        this.bossHandleId = GetHandleId(CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.bossId, this.x, this.y, this.angle));
    }

    protected deathCondition(): boolean {
        return GetHandleId(GetTriggerUnit()) === this.bossHandleId;
    }

    protected deathAction(): void {
        this.bossHandleId = undefined;

        if (this.dropTable.length === 0) {
            return;
        }

        CreateItem(
            this.dropTable.length === 1
                ? this.dropTable[0]
                : this.dropTable[this.randomNumberGenerator.random(0, this.dropTable.length - 1)],
            GetUnitX(GetDyingUnit()),
            GetUnitY(GetDyingUnit()),
        );
    }
}
