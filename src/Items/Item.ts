import { ItemLabel } from './ItemLabel';

export class Item {
    public readonly itemId: number;
    public readonly name: string;
    public readonly labels: ItemLabel[];
    public readonly goldCost: number;
    public readonly iconPath: string;
    public readonly description: string;

    constructor(itemId: number, name: string, labels: ItemLabel[], goldCost: number, iconPath: string, description: string) {
        this.itemId = itemId;
        this.name = name;
        this.labels = labels;
        this.goldCost = goldCost;
        this.iconPath = iconPath;
        this.description = description;
    }
}
