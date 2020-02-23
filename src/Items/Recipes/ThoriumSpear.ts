import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { SteelSpear } from '../BasicItems/SteelSpear';

const itemId: number = FourCC('I01F');
const name: string = 'Thorium Spear';
const labels: ItemLabel[] = [ItemLabel.PIERCING];
const goldCost: number = 1720;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThoriumRanged.blp';
const description: string = `A deadly sharp thorium spear.

|cffffcc00Piercing:|r +40

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class ThoriumSpear extends ItemRecipe {
    constructor(steelSpear: SteelSpear) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelSpear]);
    }
}
