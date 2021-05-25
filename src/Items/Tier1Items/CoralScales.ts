import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';
import { ReinforcedHide } from '../BaseItems/ReinforcedHide';

const itemId: number = FourCC('I00N');
const name = 'Coral Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH];
const goldCost = 1275;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp1.blp';
const description = `Very strong, defensive scales.

|cffffcc00Health regen:|r +15
|cffffcc00Max health:|r +150
|cffffcc00Armor:|r +1

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class CoralScales extends ItemRecipe {
    constructor(reinforcedHide: ReinforcedHide, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [reinforcedHide, studdedLeatherArmor]);
    }
}
