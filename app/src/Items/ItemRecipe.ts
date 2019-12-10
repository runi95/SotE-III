import { Item } from './Item';

export abstract class ItemRecipe extends Item {
    public readonly recipe: Item[] = [];
}
