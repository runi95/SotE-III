import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';
import { LifeStone } from '../BaseItems/LifeStone';

const itemId: number = FourCC('I03T');
const name: string = 'Blooming Flowers';
const labels: ItemLabel[] = [ItemLabel.RESTORATION, ItemLabel.MAX_HEALTH];
const goldCost: number = 3400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNUltravision.blp';
const description: string = `They're blooming with life.

|cffffcc00Max health:|r +300
|cffffcc00Restoration:|r +200%

|cFF808080Restoration restores life points based on a percentage of mana used when casting spells.|r`;

export class ShimmerWeed extends ItemRecipe {
    constructor(lifeStone: LifeStone, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [lifeStone, studdedLeatherArmor]);
    }
}
