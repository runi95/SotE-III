import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ReinforcedHide } from '../BasicItems/ReinforcedHide';

const itemId: number = FourCC('I031');
const name: string = 'Improved Reinforced Hide';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
const goldCost: number = 1050;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedReinforcedHides.blp';
const description: string = `A stronger protective layer of regenerative hide.

|cffffcc00Health regen:|r +15

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class ImprovedReinforcedHide extends ItemRecipe {
    constructor(reinforcedHide: ReinforcedHide) {
        super(itemId, name, labels, goldCost, iconPath, description, [reinforcedHide]);
    }
}
