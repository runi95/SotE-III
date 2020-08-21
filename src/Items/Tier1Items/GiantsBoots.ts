import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I04W');
const name: string = `Giant's Boots`;
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
const goldCost: number = 1100;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGiantsBoots.dds';
const description: string = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement Speed:|r +50
|cffffcc00Max health:|r +150
|cffffcc00Unique:|r Regenerates 2% of your missing health every second

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class GiantsBoots extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed, studdedLeatherArmor]);
    }
}
