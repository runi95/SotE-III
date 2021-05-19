import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { StrengthOfTheWild } from '../Tier2Items/StrengthOfTheWild';

const itemId: number = FourCC('I037');
const name = 'Improved Strength of the Wild';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost = 9840;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedStrengthOfTheWild.blp';
const description = `Only the strongest can survive in the wild.

|cffffcc00Strength:|r +82

|cFF808080Strength increases your max health and health regen.|r`;

export class ImprovedStrengthOfTheWild extends ItemRecipe {
    constructor(strengthOfTheWild: StrengthOfTheWild) {
        super(itemId, name, labels, goldCost, iconPath, description, [strengthOfTheWild, strengthOfTheWild]);
    }
}
