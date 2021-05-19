import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { Javelin } from '../Tier1Items/Javelin';
import { LongRifle } from '../Tier1Items/LongRifle';

const itemId: number = FourCC('I04I');
const name = 'Thorium Spear';
const labels: ItemLabel[] = [ItemLabel.PIERCING, ItemLabel.ATTACK_DAMAGE];
const goldCost = 8950;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNThoriumRanged.blp';
const description = `A deadly sharp thorium spear

|cffffcc00Attack damage:|r +50
|cffffcc00Piercing:|r +150

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class ThoriumSpear extends ItemRecipe {
    constructor(javelin: Javelin, longRifle: LongRifle) {
        super(itemId, name, labels, goldCost, iconPath, description, [javelin, longRifle]);
    }
}
