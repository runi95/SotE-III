import { Trigger } from '../../JassOverrides/Trigger';

export class SacrificialDaggerBuy {
    private readonly itemTypeId: number = FourCC('I02I');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SELL_ITEM);
    }

    private condition(): boolean {
        return GetItemTypeId(GetSoldItem()) === this.itemTypeId;
    }

    private action(): void {
        SetItemCharges(GetSoldItem(), 1);
    }
}
