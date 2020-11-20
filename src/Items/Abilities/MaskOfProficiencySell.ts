import { Trigger } from '../../JassOverrides/Trigger';

export class MaskOfProficiencySell {
    private readonly itemTypeId: number = FourCC('I026');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_PAWN_ITEM);
    }

    private condition(): boolean {
        return GetItemTypeId(GetSoldItem()) === this.itemTypeId;
    }

    private action(): void {
        SetItemCharges(GetSoldItem(), 12);
    }
}
