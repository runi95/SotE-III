import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I012');
const name: string = 'Branch';
const labels: ItemLabel[] = [];
const goldCost: number = 1000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNatureTouchGrow.blp';
const description: string = `A simple ingredient used in several ancient elf recipes.

|cffffcc00Effect:|r Heals 400 hitpoints over 12 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class Branch extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
