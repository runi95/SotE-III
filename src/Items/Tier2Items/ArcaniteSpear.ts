import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ThoriumSpear } from '../Tier1Items/ThoriumSpear';
import { LongRifle } from '../Tier1Items/LongRifle';

const itemId: number = FourCC('I03P');
const name: string = 'Arcanite Spear';
const labels: ItemLabel[] = [ItemLabel.PIERCING, ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 8950;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNArcaniteRanged.blp';
const description: string = `Pierces through the thickest of defenses.

|cffffcc00Attack damage:|r +50
|cffffcc00Piercing:|r +150
|cffffcc00Passive:|r Every attack has a 5% chance to completely ignore block

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class ArcaniteSpear extends ItemRecipe {
    constructor(thoriumSpear: ThoriumSpear, longRifle: LongRifle) {
        super(itemId, name, labels, goldCost, iconPath, description, [thoriumSpear, longRifle]);
    }
}
