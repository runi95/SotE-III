import { ItemRecipe } from '../ItemRecipe';
import { ReinforcedHide } from '../BasicItems/ReinforcedHide';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00N');
const name: string = 'Coral Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH];
const goldCost: number = 700;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp1.blp';
const description: string = `Very strong, defensive scales.

|cffffcc00Health regen:|r +6
|cffffcc00Max health:|r +70

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class CoralScales extends ItemRecipe {
    constructor(reinforcedHide: ReinforcedHide, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [reinforcedHide, studdedLeatherArmor]);
    }
}
