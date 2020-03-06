import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ThoriumSpear } from '../Tier1Items/ThoriumSpear';
import { VampireFangs } from '../Tier1Items/VampireFangs';

const itemId: number = FourCC('I046');
const name: string = 'Bone Chimes';
const labels: ItemLabel[] = [ItemLabel.PIERCING, ItemLabel.LIFESTEAL];
const goldCost: number = 7160;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBoneChimes.blp';
const description: string = `Death awaits those who can hear the chimes ring.

|cffffcc00Lifesteal:|r +80
|cffffcc00Piercing:|r +120

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class BoneChimes extends ItemRecipe {
    constructor(thoriumSpear: ThoriumSpear, vampireFangs: VampireFangs) {
        super(itemId, name, labels, goldCost, iconPath, description, [thoriumSpear, vampireFangs]);
    }
}
