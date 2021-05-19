import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ImprovedMoonArmor } from '../Tier1Items/ImprovedMoonArmor';
import { KhadgarsAmulet } from '../Tier1Items/KhadgarsAmulet';

const itemId: number = FourCC('I044');
const name = `Druid'sCrow`;
const labels: ItemLabel[] = [ItemLabel.REFLECT, ItemLabel.RESISTANCE];
const goldCost = 6750;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEnchantedCrows.blp';
const description = `Is it a bird or is it an elf?

|cffffcc00Resistance:|r +50
|cffffcc00Reflect:|r +50

|cFF808080Reflect deals reflect damage back to the source when taking spell damage.|r`;

export class DruidsCrow extends ItemRecipe {
    constructor(improvedMoonArmor: ImprovedMoonArmor, khadgarsAmulet: KhadgarsAmulet) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedMoonArmor, khadgarsAmulet]);
    }
}
