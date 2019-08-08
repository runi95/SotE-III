import { Trigger } from '../JassOverrides/Trigger';

export abstract class ItemRecipe {
    protected readonly isRecipeUniquesOnly: boolean = true;
    protected readonly recipe: number[] = [];
    protected readonly abstract resultingItem: number;
    protected readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_PICKUP_ITEM);
    }

    protected condition(): boolean {
        if (this.isRecipeUniquesOnly) {
            return this.recipe.some(item => item === GetItemTypeId(GetManipulatedItem())) &&
                this.recipe.every(item => UnitHasItemOfTypeBJ(GetTriggerUnit(), item));
        }

        const itemsInSlots: number[] = [];

        for (let i: number = 1; i < 7; i++) {
            itemsInSlots.push(GetItemTypeId(UnitItemInSlotBJ(GetTriggerUnit(), i)));
        }

        return this.recipe.every((item) => {
            for (let i: number = 0; i < itemsInSlots.length; i++) {
                if (itemsInSlots[i] === item) {
                    itemsInSlots.splice(i, 1);
                    return true;
                }
            }

            return false;
        });
    }

    protected action(): void {
        this.recipe.forEach(item => RemoveItem(GetItemOfTypeFromUnitBJ(GetTriggerUnit(), item)));
        UnitAddItemByIdSwapped(this.resultingItem, GetTriggerUnit());
    }
}
