import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ThoriumSpear } from '../Tier2Items/ThoriumSpear';
import { ShamanClaws } from '../Tier2Items/ShamanClaws';

const itemId: number = FourCC('I04J');
const name: string = 'Enhanced Javelin';
const labels: ItemLabel[] = [ItemLabel.PIERCING, ItemLabel.ATTACK_DAMAGE, ItemLabel.AGILITY];
const goldCost: number = 30830;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAdvancedStrengthOfTheMoon.blp';
const description: string = `An enhanced javelin

|cffffcc00Agility:|r +112
|cffffcc00Attack damage:|r +200
|cffffcc00Piercing:|r +250
|cffffcc00Passive:|r Every 5th attack deals 200 bonus damage

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class EnhancedJavelin extends ItemRecipe {
    constructor(thoriumSpear: ThoriumSpear, shamanClaws: ShamanClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [thoriumSpear, shamanClaws]);
    }
}
