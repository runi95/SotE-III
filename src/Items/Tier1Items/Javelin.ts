import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { SteelSpear } from '../BaseItems/SteelSpear';

const itemId: number = FourCC('I01F');
const name = 'Javelin';
const labels: ItemLabel[] = [ItemLabel.PIERCING];
const goldCost = 3010;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNStrengthOfTheMoon.blp';
const description = `A deadly sharp javelin

|cffffcc00Piercing:|r +70

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class Javelin extends ItemRecipe {
    constructor(steelSpear: SteelSpear) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelSpear]);
    }
}
