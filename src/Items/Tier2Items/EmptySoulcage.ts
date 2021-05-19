import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';

// tslint:disable: max-line-length
const itemId: number = FourCC('I009');
const name = 'Empty Soulcage';
const labels: ItemLabel[] = [];
const goldCost = 500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNSoulstone.blp';
const description = `The soulcage is missing 3 gems, maybe if you could put the gems back inside you would be able to harness it's powers.`;

export class EmptySoulcage extends ItemRecipe {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description, []);
    }
}
