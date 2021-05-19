import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00A');
const name = 'Green Soulstone';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.MAX_HEALTH];
const goldCost = 2000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNGem.blp';
const description = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.

|cffffcc00Strength:|r +10
|cffffcc00Max health:|r +200

|cFF808080Strength increases your max health and health regen.|r`;

export class GreenSoulstone extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
