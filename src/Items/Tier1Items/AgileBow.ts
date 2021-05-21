import { ItemRecipe } from '../ItemRecipe';
import { Claws } from '../BaseItems/Claws';
import { ItemLabel } from '../ItemLabel';
import { SteelSpear } from '../BaseItems/SteelSpear';

const itemId: number = FourCC('I054');
const name = 'Agile Bow';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.PIERCING];
const goldCost = 1215;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedBows.blp';
const description = `Make every hit count!

|cffffcc00Agility:|r +20
|cffffcc00Piercing:|r +15
|cffffcc00Effect(1):|r Dealing physical damage increases item charges by 1 (max 10)
|cffffcc00Effect(2):|r Reaching 10 charges causes your next phyiscal attack to slam the target dealing 120 damage as well as slowing movement and attack speed of enemies within the area of 250 by 25%

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class AgileBow extends ItemRecipe {
    constructor(claws: Claws, steelSpear: SteelSpear) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, steelSpear]);
    }
}
