import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { MaulOfStrength } from '../Tier1Items/MaulOfStrength';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';
import { WarAxe } from '../BaseItems/WarAxe';

const itemId: number = FourCC('I05E');
const name = 'Enhanced Maul of Strength';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.MAX_HEALTH];
const goldCost = 2880;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedHammer.dds';
const description = `A heavy maul that gives an even heavier responsibility to the wielder.

|cffffcc00Strength:|r +23
|cffffcc00Max health:|r +600
|cffffcc00Effect(1):|r Taking damage increases item charges by 1 (max 15 charges) for 5 seconds
|cffffcc00Effect(2):|r Physical damage dealt is increased by 15 for each item stack

|cFF808080Strength increases your max health and health regen.|r`;

export class EnhancedMaulOfStrength extends ItemRecipe {
    constructor(maulOfStrength: MaulOfStrength, studdedLeatherArmor: StuddedLeatherArmor, warAxe: WarAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [maulOfStrength, studdedLeatherArmor, warAxe]);
    }
}
