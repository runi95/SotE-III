import { ItemRecipe } from '../ItemRecipe';
import { ReinforcedScales } from '../Tier3Items/ReinforcedScales';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02D');
const name: string = 'Advanced Reinforced Hides';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH, ItemLabel.HEALTH_REGEN, ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost: number = 13550;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAdvancedReinforcedHides.blp';
const description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Health:|r +750
|cffffcc00Health regen:|r +60
|cffffcc00Block:|r +50
|cffffcc00Resistance:|r +50

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class AdvancedReinforcedHides extends ItemRecipe {
    constructor(reinforcedScales: ReinforcedScales) {
        super(itemId, name, labels, goldCost, iconPath, description, [reinforcedScales]);
    }
}
