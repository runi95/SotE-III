import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02Y');
const name = 'Enchanted Gemstone';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE];
const goldCost = 9894;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEnchantedGemstone.blp';
const description = `A gemstone enchanted by powerful magic.

|cffffcc00Intelligence:|r +99

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class EnchantedGemstone extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
