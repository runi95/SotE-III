import { Trigger } from '../JassOverrides/Trigger';

export abstract class Boss {
    protected abstract readonly bossId: number;
    protected abstract readonly x: number;
    protected abstract readonly y: number;
    protected abstract readonly angle: number;
    protected readonly lootItemId: number | undefined = undefined;
    protected bossHandleId: number | undefined = undefined;
    protected readonly spawnTrig: Trigger = new Trigger();
    protected readonly deathTrig: Trigger = new Trigger();

    constructor(spawnRect: rect) {
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

        if (this.lootItemId === undefined) {
            return;
        }

        CreateItem(this.lootItemId, GetUnitX(GetDyingUnit()), GetUnitY(GetDyingUnit()));
    }
}
