import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I005');
const name = 'Iron Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK];
const goldCost = 330;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHumanArmorUpOne.blp';
const description = `A weak shield capable of blocking incoming physical damage.

|cffffcc00Block:|r +10

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class IronShield extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
