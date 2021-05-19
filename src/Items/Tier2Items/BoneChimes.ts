import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { Javelin } from '../Tier1Items/Javelin';
import { VampireFangs } from '../Tier1Items/VampireFangs';

const itemId: number = FourCC('I046');
const name = 'Bone Chimes';
const labels: ItemLabel[] = [ItemLabel.PIERCING, ItemLabel.LIFESTEAL];
const goldCost = 7160;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNBoneChimes.blp';
const description = `Death awaits those who can hear the chimes ring.

|cffffcc00Lifesteal:|r +80
|cffffcc00Piercing:|r +120

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class BoneChimes extends ItemRecipe {
    constructor(javelin: Javelin, vampireFangs: VampireFangs) {
        super(itemId, name, labels, goldCost, iconPath, description, [javelin, vampireFangs]);
    }
}
