import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { StrengthOfTheWild } from '../Tier2Items/StrengthOfTheWild';

const itemId: number = FourCC('I037');
const name: string = 'Improved Strength of the Wild';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 9840;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedStrengthOfTheWild.blp';
const description: string = `Only the strongest can survive in the wild.

|cffffcc00Strength:|r +82

|cFF808080Strength increases your max health and health regen.|r`;

export class ImprovedStrengthOfTheWild extends ItemRecipe {
    constructor(strengthOfTheWild: StrengthOfTheWild) {
        super(itemId, name, labels, goldCost, iconPath, description, [strengthOfTheWild, strengthOfTheWild]);
    }
}
