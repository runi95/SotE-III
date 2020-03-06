import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ShimmerWeed } from '../Tier1Items/ShimmerWeed';
import { ManaStone } from '../Tier1Items/ManaStone';

const itemId: number = FourCC('I040');
const name: string = 'Sunken Shard';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA, ItemLabel.RESTORATION];
const goldCost: number = 6900;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPendantOfMana.blp';
const description: string = `Must've been down there for a long time.

|cffffcc00Max mana:|r +900
|cffffcc00Restoration:|r +350%

|cFF808080Restoration restores life points based on a percentage of mana used when casting spells.|r`;

export class SunkenShard extends ItemRecipe {
    constructor(shimmerWeed: ShimmerWeed, manaStone: ManaStone) {
        super(itemId, name, labels, goldCost, iconPath, description, [shimmerWeed, manaStone]);
    }
}
