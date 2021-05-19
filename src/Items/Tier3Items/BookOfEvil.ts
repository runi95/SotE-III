import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { BookOfMagic } from '../Tier2Items/BookOfMagic';
import { EnhancedMantleOfIntelligence } from '../Tier2Items/EnhancedMantleOfIntelligence';

const itemId: number = FourCC('I04M');
const name = 'Book of Evil';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.PERSEVERANCE];
const goldCost = 32200;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNNecromancerMaster.blp';
const description = `A book full of true evil.

|cffffcc00Intelligence:|r +250
|cffffcc00Perseverance:|r +200
|cffffcc00Passive:|r All magi cdamage has a 5% chance to completely ignore resistance

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class BookOfEvil extends ItemRecipe {
    constructor(bookOfMagic: BookOfMagic, enhancedMantleOfIntelligence: EnhancedMantleOfIntelligence) {
        super(itemId, name, labels, goldCost, iconPath, description, [bookOfMagic, enhancedMantleOfIntelligence]);
    }
}
