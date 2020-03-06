import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { BookOfKnowledge } from '../Tier1Items/BookOfKnowledge';

const itemId: number = FourCC('I035');
const name: string = 'Book of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE];
const goldCost: number = 10000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSorceressAdept.blp';
const description: string = `A book containing long lost knowledge.

|cffffcc00Intelligence:|r +100

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class BookOfMagic extends ItemRecipe {
    constructor(bookOfKnowledge: BookOfKnowledge) {
        super(itemId, name, labels, goldCost, iconPath, description, [bookOfKnowledge]);
    }
}
