import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00B');
const name = 'Blue Soulstone';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE];
const goldCost = 1800;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNBlueGem.blp';
const description = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.

|cffffcc00Intelligence:|r +18

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class BlueSoulstone extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
