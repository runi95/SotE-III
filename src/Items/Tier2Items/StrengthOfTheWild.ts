import { ItemRecipe } from '../ItemRecipe';
import { MaulOfStrength } from '../Tier1Items/MaulOfStrength';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02A');
const name = 'Strength of the Wild';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost = 7200;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNDOCAdeptTraining.blp';
const description = `Only the strong can survive in the wild.

|cffffcc00Strength:|r +60

|cFF808080Strength increases your max health and health regen.|r`;

export class StrengthOfTheWild extends ItemRecipe {
    constructor(maulOfStrength: MaulOfStrength) {
        super(itemId, name, labels, goldCost, iconPath, description, [maulOfStrength]);
    }
}
