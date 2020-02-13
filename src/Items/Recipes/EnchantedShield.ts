import { ItemRecipe } from '../ItemRecipe';
import { MoonArmor } from '../BasicItems/MoonArmor';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';

const itemId: number = FourCC('I027');
const name: string = 'Enchanted Shield';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.RESISTANCE];
const goldCost: number = 1480;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThoriumArmor.blp';
const description: string = `A shield that glows with magical potency.

|cffffcc00Max health:|r +250
|cffffcc00Resistance:|r +8

|cFF808080Health determines how much damage you can take before dying.|r`;

export class EnchantedShield extends ItemRecipe {
    constructor(studdedLeatherArmor: StuddedLeatherArmor, moonArmor: MoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [studdedLeatherArmor, moonArmor]);
    }
}
