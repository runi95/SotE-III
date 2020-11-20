import { Trigger } from '../../JassOverrides/Trigger';

export class MaskOfProficiencyCast {
    protected readonly itemTypeId: number = FourCC('I026');
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_EFFECT);
    }

    private condition(): boolean {
        return UnitHasItemOfTypeBJ(GetTriggerUnit(), this.itemTypeId);
    }

    private action(): void {
        const trig: unit = GetTriggerUnit();
        const maskOfProficiency: item = GetItemOfTypeFromUnitBJ(trig, this.itemTypeId);
        const charges: number = GetItemCharges(maskOfProficiency);
        if (charges > 3) {
            BlzSetUnitMaxMana(trig, BlzGetUnitMaxMana(trig) + 2);
            SetItemCharges(maskOfProficiency, charges - 3);
        }
    }
}
