import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ImprovedNaturesBlessing } from '../Tier2Items/ImprovedNaturesBlessing';
import { ImprovedShimmerWeed } from '../Tier2Items/ImprovedShimmerWeed';

const itemId: number = FourCC('I04R');
const name: string = 'Shimmer Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH];
const goldCost: number = 29400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSirenAdept.blp';
const description: string = `The optiomal scaley experience.

|cffffcc00Max health:|r: +7000
|cffffcc00Health regen:|r +120
|cffffcc00Passive:|r Regenerates 2% of the wearer's max health every second

|cFF808080Health determines how much damage you can take before dying.|r`;

export class ShimmerScales extends ItemRecipe {
    constructor(improvedNaturesBlessing: ImprovedNaturesBlessing, improvedShimmerWeed: ImprovedShimmerWeed) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedNaturesBlessing, improvedShimmerWeed]);
    }
}
