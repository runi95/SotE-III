import { Trigger } from '../JassOverrides/Trigger';

export abstract class ItemPickupAndDrop {
    protected abstract readonly itemTypeId: number;
    protected readonly pickupTrig: Trigger = new Trigger();
    protected readonly dropTrig: Trigger = new Trigger();

    protected constructor() {
        this.pickupTrig.addCondition(() => this.condition());
        this.pickupTrig.addAction(() => this.pickup());
        this.pickupTrig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_PICKUP_ITEM);

        this.dropTrig.addCondition(() => this.condition());
        this.dropTrig.addAction(() => this.drop());
        this.dropTrig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DROP_ITEM);
    }

    protected condition(): boolean {
        if (!IsUnitType(GetManipulatingUnit(), UNIT_TYPE_HERO)) {
            return false;
        }

        return GetItemTypeId(GetManipulatedItem()) === this.itemTypeId;
    }

    protected abstract pickup(): void;
    protected abstract drop(): void;
}
