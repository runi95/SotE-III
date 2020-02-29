import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ImprovedStrengthOfTheWild } from '../Tier3Items/ImprovedStrengthOfTheWild';
import { GreenSoulstone } from '../UnclassedItems/GreenSoulstone';

const itemId: number = FourCC('I038');
const name: string = 'Advanced Strength of the Wild';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.BLOCK, ItemLabel.MAX_HEALTH];
const goldCost: number = 26500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAdvancedStrengthOfTheWild.blp';
const description: string = `The strength of the wild can be truly impressive.

|cffffcc00Max health:|r +1000
|cffffcc00Strength:|r +200

|cFF808080Strength increases your max health and health regen.|r`;

export class AdvancedStrengthOfTheWild extends ItemRecipe {
    constructor(improvedStrengthOfTheWild: ImprovedStrengthOfTheWild, greenSoulstone: GreenSoulstone) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedStrengthOfTheWild, greenSoulstone]);
    }
}
