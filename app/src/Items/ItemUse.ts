import { Trigger } from '../JassOverrides/Trigger';

export abstract class ItemUse {
    protected readonly abstract itemTypeId: number;
    protected readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_USE_ITEM);
    }

    protected condition(): boolean {
        return GetItemTypeId(GetManipulatedItem()) === this.itemTypeId;
    }

    protected abstract action(): void;
}
