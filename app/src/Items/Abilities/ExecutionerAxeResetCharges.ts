import { Trigger } from '../../JassOverrides/Trigger';

export class ExecutionerAxeResetCharges {
    private readonly itemTypeId: number = FourCC('I00Y');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.AddCondition(() => this.condition());
        this.trig.AddAction(() => this.action());
        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_SELL_ITEM);
    }

    private condition(): boolean {
        return GetItemTypeId(GetSoldItem()) === this.itemTypeId;
    }

    private action(): void {
        SetItemCharges(GetSoldItem(), 1);
    }
}
