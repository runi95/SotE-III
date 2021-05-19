import { Item } from './Item';
import { ItemLabel } from './ItemLabel';

export class ItemRecipe extends Item {
    public readonly recipe: Item[];
    public readonly recipeCost: number;

    constructor(
        itemId: number,
        name: string,
        labels: ItemLabel[],
        goldCost: number,
        iconPath: string,
        description: string,
        recipe: Item[] = [],
    ) {
        super(itemId, name, labels, goldCost, iconPath, description);
        this.recipe = recipe;

        let recipeItemsCost = 0;
        for (let i = 0; i < this.recipe.length; i++) {
            recipeItemsCost += this.recipe[i].goldCost;
        }

        this.recipeCost = this.goldCost - recipeItemsCost;
    }
}
