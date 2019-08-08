import { Trigger } from '../JassOverrides/Trigger';

export abstract class ItemPickup {
    protected readonly abstract itemTypeId: number;
    protected readonly trig: Trigger = new Trigger();

    protected constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_PICKUP_ITEM);
    }

    protected condition(): boolean {
        return GetItemTypeId(GetManipulatedItem()) === this.itemTypeId;
    }

    protected abstract action(): void;
}
