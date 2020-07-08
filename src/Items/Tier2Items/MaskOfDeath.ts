import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VampireFangs } from '../Tier1Items/VampireFangs';
import { LoadedRifle } from '../Tier1Items/LoadedRifle';

const itemId: number = FourCC('I030');
const name: string = 'Mask of Death';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.LIFESTEAL];
const goldCost: number = 6775;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMaskOfDeath.blp';
const description: string = `Makes your enemies tremble with fear.

|cffffcc00Attack damage:|r +68
|cffffcc00Lifesteal:|r +135

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class MaskOfDeath extends ItemRecipe {
    constructor(vampireFangs: VampireFangs, loadedRifle: LoadedRifle) {
        super(itemId, name, labels, goldCost, iconPath, description, [vampireFangs, loadedRifle]);
    }
}
