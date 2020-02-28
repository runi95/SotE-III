import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VampireFangs } from './VampireFangs';
import { LoadedRifle } from './LoadedRifle';

const itemId: number = FourCC('I030');
const name: string = 'Mask of Death';
const labels: ItemLabel[] = [ItemLabel.LIFESTEAL];
const goldCost: number = 5000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMaskOfDeath.blp';
const description: string = `Makes your enemies tremble with fear.

|cffffcc00Attack damage:|r +50
|cffffcc00Lifesteal:|r +100

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class MaskOfDeath extends ItemRecipe {
    constructor(vampireFangs: VampireFangs, loadedRifle: LoadedRifle) {
        super(itemId, name, labels, goldCost, iconPath, description, [vampireFangs, loadedRifle]);
    }
}
