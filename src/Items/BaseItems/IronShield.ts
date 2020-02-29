import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I005');
const name: string = 'Iron Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK];
const goldCost: number = 200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanArmorUpOne.blp';
const description: string = `A weak shield capable of blocking incoming physical damage.

|cffffcc00Block:|r +3

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class IronShield extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
