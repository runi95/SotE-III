import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { SteelSpear } from '../BaseItems/SteelSpear';
import { IronSword } from '../BaseItems/IronSword';

const itemId: number = FourCC('I027');
const name = 'Long Rifle';
const labels: ItemLabel[] = [ItemLabel.PIERCING, ItemLabel.ATTACK_DAMAGE];
const goldCost = 2790;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNDwarvenLongRifle.blp';
const description = `An extended long rifle.

|cffffcc00Attack damage:|r +30
|cffffcc00Piercing:|r +30

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class LongRifle extends ItemRecipe {
    constructor(steelSpear: SteelSpear, ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [steelSpear, ironSword]);
    }
}
