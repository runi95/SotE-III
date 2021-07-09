import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { ItemLabel } from '../ItemLabel';
import { MoonArmor } from '../BaseItems/MoonArmor';

const itemId: number = FourCC('I04Y');
const name = 'Scaled Boots';
const labels: ItemLabel[] = [ItemLabel.RESISTANCE];
const goldCost = 1160;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNScaledBoots.dds';
const description = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement speed:|r +50
|cffffcc00Resistance:|r +12
|cffffcc00Unique:|r Reduces incoming spell damage by 8%

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class ScaledBoots extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed, moonArmor: MoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed, moonArmor]);
    }
}
