import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I03O');
const name = 'Reinforced Leather Armor';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
const goldCost = 3000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNLeatherUpgradeTwo.blp';
const description = `A reinforced leather armor.

|cffffcc00Max health:|r +750

|cFF808080Health determines how much damage you can take before dying.|r`;

export class ReinforcedLeatherArmor extends ItemRecipe {
    constructor(studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [studdedLeatherArmor]);
    }
}
