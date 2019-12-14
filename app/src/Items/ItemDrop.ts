import { Trigger } from '../JassOverrides/Trigger';

export abstract class ItemDrop {
    protected abstract readonly itemTypeId: number;
    protected readonly trig: Trigger = new Trigger();

    protected constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DROP_ITEM);
    }

    protected condition(): boolean {
        if (!IsUnitType(GetManipulatingUnit(), UNIT_TYPE_HERO)) {
            return false;
        }

        return GetItemTypeId(GetManipulatedItem()) === this.itemTypeId;
    }

    protected abstract action(): void;
}
