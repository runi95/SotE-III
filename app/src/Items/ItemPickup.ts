import { Trigger } from '../JassOverrides/Trigger';

export abstract class ItemPickup {
    protected readonly abstract itemTypeId: number;
    protected trig: Trigger = new Trigger();

    protected constructor() {
        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_PICKUP_ITEM);
    }

    protected condition(): boolean {
        return GetItemTypeId(GetManipulatedItem()) === this.itemTypeId;
    }

    protected abstract action(): void;
}
