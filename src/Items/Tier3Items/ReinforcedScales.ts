import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01K');
const name = 'Reinforced Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH, ItemLabel.BLOCK];
const goldCost = 4800;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp3.blp';
const description = `Highly reinforced scales, sure to defend against the strongest of opponents.

|cffffcc00Health regen:|r +40
|cffffcc00Max health:|r +500

|cFF808080Health determines how much damage you can take before dying.|r`;

export class ReinforcedScales extends ItemRecipe {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description, []);
    }
}
