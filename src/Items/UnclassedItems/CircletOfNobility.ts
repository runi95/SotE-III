import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I04U');
const name = 'Circlet of Nobility';
const labels: ItemLabel[] = [ItemLabel.MANA_REGEN, ItemLabel.MAX_MANA, ItemLabel.INTELLIGENCE];
const goldCost = 500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCirclet.blp';
const description = `A circlet only worn by the most noble of heroes.

|cffffcc00Mana:|r +50
|cffffcc00Intelligence:|r +7
|cffffcc00Mana regen:|r +5

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class CircletOfNobility extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
