import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I04U');
const name: string = 'Circlet of Nobility';
const labels: ItemLabel[] = [ItemLabel.MANA_REGEN, ItemLabel.MAX_MANA, ItemLabel.INTELLIGENCE];
const goldCost: number = 500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCirclet.blp';
const description: string = `A circlet only worn by the most noble of heroes.

|cffffcc00Mana:|r +50
|cffffcc00Intelligence:|r +5
|cffffcc00Mana regen:|r +4

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class CircletOfNobility extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
