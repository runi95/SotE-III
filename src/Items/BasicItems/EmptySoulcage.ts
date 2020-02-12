import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

// tslint:disable: max-line-length
const itemId: number = FourCC('I009');
const name: string = 'Empty Soulcage';
const labels: ItemLabel[] = [];
const goldCost: number = 500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSoulstone.blp';
const description: string = `The soulcage is missing 3 gems, maybe if you could put the gems back inside you would be able to harness it's powers.`;

export class EmptySoulcage extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
