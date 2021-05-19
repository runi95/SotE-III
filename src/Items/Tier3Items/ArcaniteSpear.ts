import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ThoriumSpear } from '../Tier2Items/ThoriumSpear';

const itemId: number = FourCC('I03P');
const name = 'Arcanite Spear';
const labels: ItemLabel[] = [ItemLabel.PIERCING, ItemLabel.ATTACK_DAMAGE];
const goldCost = 35800;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNArcaniteRanged.blp';
const description = `Pierces through the thickest of defenses.

|cffffcc00Attack damage:|r +200
|cffffcc00Piercing:|r +600
|cffffcc00Passive:|r Every attack has a 5% chance to completely ignore block

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class ArcaniteSpear extends ItemRecipe {
    constructor(thoriumSpear: ThoriumSpear) {
        super(itemId, name, labels, goldCost, iconPath, description, [thoriumSpear]);
    }
}
