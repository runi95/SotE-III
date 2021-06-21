import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I04W');
const name = `Giant's Boots`;
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
const goldCost = 1100;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNGiantsBoots.dds';
const description = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement Speed:|r +50
|cffffcc00Max health:|r +240
|cffffcc00Unique:|r Regenerates 2% of your missing health every second

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class GiantsBoots extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed, studdedLeatherArmor]);
    }
}
