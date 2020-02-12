import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00M');
const name: string = 'Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost: number = 300;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNUnholyStrength.blp';
const description: string = `Practicing with these will surely make you super fast.

|cffffcc00Agility:|r +4

|cFF808080Agility increases your attack and movement speed.|r`;

export class Claws extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
