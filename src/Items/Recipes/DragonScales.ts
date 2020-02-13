import { ItemRecipe } from '../ItemRecipe';
import { DragonWhelpClaws } from './DragonWhelpClaws';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';

const itemId: number = FourCC('I02H');
const name: string = 'Dragon Scales';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.MAX_HEALTH];
const goldCost: number = 2730;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCreatureCarapace.tga';
const description: string = `These scales are deadly sharp

|cffffcc00Max health:|r +345
|cffffcc00Agility:|r +15

|cFF808080Agility increases your attack and movement speed.|r`;

export class DragonScales extends ItemRecipe {
    constructor(dragonWhelpClaws: DragonWhelpClaws, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [dragonWhelpClaws, studdedLeatherArmor]);
    }
}
