import { Trigger } from '../../JassOverrides/Trigger';

export class ExecutionerAxe {
    private readonly itemTypeId: number = FourCC('I00Y');
    private readonly bloodiedExecutionerAxeItemId: number = FourCC('I00Z');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return UnitHasItemOfTypeBJ(GetKillingUnit(), this.itemTypeId);
    }

    private action(): void {
        const itm: item = GetItemOfTypeFromUnitBJ(GetKillingUnit(), this.itemTypeId);
        const charges: number = GetItemCharges(itm) + 1;

        if (charges > 99) {
            RemoveItem(itm);
            UnitAddItemById(GetKillingUnit(), this.bloodiedExecutionerAxeItemId);
        } else {
            SetItemCharges(itm, charges);
        }
    }
}
