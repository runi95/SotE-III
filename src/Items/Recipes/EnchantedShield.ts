import { ItemRecipe } from '../ItemRecipe';
import { MoonArmor } from '../BasicItems/MoonArmor';
import { OrbOfMagic } from '../BasicItems/OrbOfMagic';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I027');
const name: string = 'Enchanted Shield';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.RESISTANCE];
const goldCost: number = 860;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThoriumArmor.blp';
const description: string = `A shield that glows with magical potency.

|cffffcc00Intelligence:|r +5
|cffffcc00Resistance:|r +6

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class EnchantedShield extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, moonArmor: MoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, moonArmor]);
    }
}
