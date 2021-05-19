import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00C');
const name = 'Purple Soulstone';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.ATTACK_DAMAGE];
const goldCost = 1700;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPurpleGem.blp';
const description = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.

|cffffcc00Agility:|r +4
|cffffcc00Attack damage:|r +5

|cFF808080Agility increases your attack and movement speed.|r`;

export class PurpleSoulstone extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
