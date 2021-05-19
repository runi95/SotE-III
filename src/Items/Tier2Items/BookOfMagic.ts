import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I035');
const name = 'Book of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE];
const goldCost = 10000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNSorceressAdept.blp';
const description = `A book containing long lost knowledge.

|cffffcc00Intelligence:|r +100

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class BookOfMagic extends ItemRecipe {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description, []);
    }
}
