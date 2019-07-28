import { Trigger } from '../JassOverrides/Trigger';

export abstract class ItemUse {
    protected readonly abstract itemTypeId: number;
    protected readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_USE_ITEM);
    }

    protected condition(): boolean {
        return GetItemTypeId(GetManipulatedItem()) === this.itemTypeId;
    }

    protected abstract action(): void;
}
