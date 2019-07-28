import { Trigger } from '../../JassOverrides/Trigger';

export class ExecutionerAxe {
    private readonly itemTypeId: number = FourCC('I00Y');
    private readonly bloodiedExecutionerAxeItemId: number = FourCC('I00Z');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return UnitHasItemOfTypeBJ(GetKillingUnit(), this.itemTypeId);
    }

    private action(): void {
        const itm: item = GetItemOfTypeFromUnitBJ(GetKillingUnit(), this.itemTypeId);
        const charges: number = GetItemCharges(itm) + 1;

        if (charges > 99) {
            RemoveItem(itm);
            UnitAddItemByIdSwapped(this.bloodiedExecutionerAxeItemId, GetKillingUnit());
        } else {
            SetItemCharges(itm, charges);
        }
    }
}
