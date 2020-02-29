import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I03O');
const name: string = 'Reinforced Leather Armor';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
const goldCost: number = 600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNLeatherUpgradeTwo.blp';
const description: string = `A reinforced leather armor.

|cffffcc00Max health:|r +150

|cFF808080Health determines how much damage you can take before dying.|r`;

export class ReinforcedLeatherArmor extends ItemRecipe {
    constructor(studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [studdedLeatherArmor]);
    }
}
