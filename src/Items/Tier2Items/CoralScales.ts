import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ImprovedReinforcedHide } from '../Tier1Items/ImprovedReinforcedHide';
import { ReinforcedLeatherArmor } from '../Tier1Items/ReinforcedLeatherArmor';

const itemId: number = FourCC('I00N');
const name: string = 'Coral Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH];
const goldCost: number = 1100;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp1.blp';
const description: string = `Very strong, defensive scales.

|cffffcc00Health regen:|r +10
|cffffcc00Max health:|r +100

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class CoralScales extends ItemRecipe {
    constructor(improvedReinforcedHide: ImprovedReinforcedHide, reinforcedLeatherArmor: ReinforcedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedReinforcedHide, reinforcedLeatherArmor]);
    }
}
