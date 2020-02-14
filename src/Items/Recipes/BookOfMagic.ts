import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VialOfMagic } from './VialOfMagic';
import { BookOfKnowledge } from './BookOfKnowledge';

const itemId: number = FourCC('I035');
const name: string = 'Book of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
const goldCost: number = 3750;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSorceressAdept.blp';
const description: string = `A book containing long lost knowledge.

|cffffcc00Intelligence:|r +30
|cffffcc00Max Mana:|r +250

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class BookOfMagic extends ItemRecipe {
    constructor(bookOfKnowledge: BookOfKnowledge, vialOfMagic: VialOfMagic) {
        super(itemId, name, labels, goldCost, iconPath, description, [bookOfKnowledge, vialOfMagic]);
    }
}
