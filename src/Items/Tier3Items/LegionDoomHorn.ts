import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { BoneChimes } from '../Tier2Items/BoneChimes';
import { MaskOfDeath } from '../Tier2Items/MaskOfDeath';

const itemId: number = FourCC('I04O');
const name = 'Legion Doom-Horn';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.LIFESTEAL, ItemLabel.PIERCING];
const goldCost = 22000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHornOfDoom.blp';
const description = `Makes your enemies tremble with fear.

|cffffcc00Attack damage:|r +75
|cffffcc00Lifesteal:|r +300
|cffffcc00Piercing:|r +250
|cffffcc00Unique:|r Overflowing piercing damage is converted to lifesteal

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class LegionDoomHorn extends ItemRecipe {
    constructor(boneChimes: BoneChimes, maskOfDeath: MaskOfDeath) {
        super(itemId, name, labels, goldCost, iconPath, description, [boneChimes, maskOfDeath]);
    }
}
