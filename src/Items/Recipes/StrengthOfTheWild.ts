import { ItemRecipe } from '../ItemRecipe';
import { MaulOfStrength } from './MaulOfStrength';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02A');
const name: string = 'Strength of the Wild';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 3600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDOCAdeptTraining.blp';
const description: string = `Only the strong can survive in the wild.

|cffffcc00Strength:|r +30

|cFF808080Strength increases your max health and health regen.|r`;

export class StrengthOfTheWild extends ItemRecipe {
    constructor(maulOfStrength: MaulOfStrength) {
        super(itemId, name, labels, goldCost, iconPath, description, [maulOfStrength]);
    }
}
