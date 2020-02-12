import { ItemRecipe } from '../ItemRecipe';
import { BerserkerAxes } from './BerserkerAxes';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02A');
const name: string = 'Enhanced Berserker Axes';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 2160;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedBerserkerAxes.blp';
const description: string = `Dual axes only wielded by the strongest berserkers.

|cffffcc00Strength:|r +18

|cFF808080Strength increases your max health and health regen.|r`;

export class EnhancedBerserkerAxes extends ItemRecipe {
    constructor(berserkerAxes: BerserkerAxes) {
        super(itemId, name, labels, goldCost, iconPath, description, [berserkerAxes]);
    }
}
