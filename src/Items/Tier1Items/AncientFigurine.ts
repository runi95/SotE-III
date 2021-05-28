import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I058');
const name = 'Ancient Figurine';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_HEALTH];
const goldCost = 1100;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNClayFigurine.blp';
const description = `A very old, ancient figurine.

|cffffcc00Intelligence:|r +10
|cffffcc00Max health:|r +150
|cffffcc00Effect:|r Reduces damage taken by 10% for a duration of 5 seconds after casting a spell

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class AncientFigurine extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, studdedLeatherArmor]);
    }
}
