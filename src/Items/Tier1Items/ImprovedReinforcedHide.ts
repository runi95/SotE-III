import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ReinforcedHide } from '../BaseItems/ReinforcedHide';

const itemId: number = FourCC('I031');
const name = 'Improved Reinforced Hide';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
const goldCost = 2800;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedReinforcedHides.blp';
const description = `A stronger protective layer of regenerative hide.

|cffffcc00Health regen:|r +40

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class ImprovedReinforcedHide extends ItemRecipe {
    constructor(reinforcedHide: ReinforcedHide) {
        super(itemId, name, labels, goldCost, iconPath, description, [reinforcedHide]);
    }
}
