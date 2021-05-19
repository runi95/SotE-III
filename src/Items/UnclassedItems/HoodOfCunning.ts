import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I04T');
const name = 'Hood of Cunning';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH, ItemLabel.BLOCK];
const goldCost = 500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHoodOfCunning.blp';
const description = `Something to keep your head warm and protected.

|cffffcc00Health:|r +90
|cffffcc00Health regen:|r +5
|cffffcc00Block:|r +5

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class HoodOfCunning extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
