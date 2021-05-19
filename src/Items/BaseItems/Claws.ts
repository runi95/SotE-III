import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00M');
const name = 'Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost = 360;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNUnholyStrength.blp';
const description = `Practicing with these will surely make you super fast.

|cffffcc00Agility:|r +8

|cFF808080Agility increases your attack and movement speed.|r`;

export class Claws extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
