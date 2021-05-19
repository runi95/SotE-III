import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VampireFangs } from '../Tier1Items/VampireFangs';

const itemId: number = FourCC('I030');
const name = 'Mask of Death';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.LIFESTEAL];
const goldCost = 6775;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMaskOfDeath.blp';
const description = `Makes your enemies tremble with fear.

|cffffcc00Attack damage:|r +68
|cffffcc00Lifesteal:|r +135

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class MaskOfDeath extends ItemRecipe {
    constructor(vampireFangs: VampireFangs) {
        super(itemId, name, labels, goldCost, iconPath, description, [vampireFangs]);
    }
}
