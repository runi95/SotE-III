import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { AmuletOfProtection } from '../Tier1Items/AmuletOfProtection';
import { ReinforcedLeatherArmor } from '../Tier1Items/ReinforcedLeatherArmor';

const itemId: number = FourCC('I04C');
const name = 'Improved Amulet of Protection';
const labels: ItemLabel[] = [ItemLabel.REFLECT, ItemLabel.MAX_HEALTH];
const goldCost = 8950;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNAmulet.blp';
const description = `Protects the wearer from spells and magic.

|cffffcc00Max health:|r +1200
|cffffcc00Reflect:|r +70

|cFF808080Reflect deals reflect damage back to the source when taking spell damage.|r`;

export class ImprovedAmuletOfProtection extends ItemRecipe {
    constructor(amuletOfProtection: AmuletOfProtection, reinforcedLeatherArmor: ReinforcedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [amuletOfProtection, reinforcedLeatherArmor]);
    }
}
