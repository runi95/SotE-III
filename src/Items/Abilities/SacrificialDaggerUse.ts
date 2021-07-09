import { ItemUse } from '../ItemUse';

export class SacrificialDaggerUse extends ItemUse {
    protected readonly itemTypeId: number = FourCC('I02I');
    private readonly bloodiedSacrificialDagger: number = FourCC('I02J');

    protected action(): void {
        const charges: number = GetItemCharges(GetManipulatedItem()) + 10;

        if (charges >= 100) {
            RemoveItem(GetManipulatedItem());
            UnitAddItemByIdSwapped(this.bloodiedSacrificialDagger, GetTriggerUnit());
        }

        UnitDamageTargetBJ(GetTriggerUnit(), GetTriggerUnit(), 100, ATTACK_TYPE_MAGIC, DAMAGE_TYPE_MAGIC);
        SetItemCharges(GetManipulatedItem(), charges);
    }
}
