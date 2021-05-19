import { ItemRecipe } from '../ItemRecipe';
import { ImprovedCreatureClaws } from '../Tier2Items/ImprovedCreatureClaws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02H');
const name = 'Dragon Scales';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.MAX_HEALTH];
const goldCost = 8500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCreatureCarapace.tga';
const description = `These scales are deadly sharp

|cffffcc00Max health:|r +1000
|cffffcc00Agility:|r +50

|cFF808080Agility increases your attack and movement speed.|r`;

export class DragonScales extends ItemRecipe {
    constructor(improvedCreatureClaws: ImprovedCreatureClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedCreatureClaws]);
    }
}
