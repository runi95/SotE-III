import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ShimmerWeed } from '../Tier1Items/ShimmerWeed';
import { BrightLifeStone } from '../Tier1Items/BrightLifeStone';
import { ReinforcedLeatherArmor } from '../Tier1Items/ReinforcedLeatherArmor';

const itemId: number = FourCC('I03Z');
const name = 'Improved Shimmer Weeed';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH, ItemLabel.RESTORATION];
const goldCost = 12000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedShimmerWeed.dds';
const description = `They're blooming with life.

|cffffcc00Max health:|r +1500
|cffffcc00Restoration:|r +500%

|cFF808080Restoration restores life points based on a percentage of mana used when casting spells.|r`;

export class ImprovedShimmerWeed extends ItemRecipe {
    constructor(shimmerWeed: ShimmerWeed, brightLifeStone: BrightLifeStone, reinforcedLeatherArmor: ReinforcedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [shimmerWeed, brightLifeStone, reinforcedLeatherArmor]);
    }
}
