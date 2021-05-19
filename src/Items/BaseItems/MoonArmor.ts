import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I008');
const name = 'Moon Armor';
const labels: ItemLabel[] = [ItemLabel.RESISTANCE];
const goldCost = 385;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMoonArmor.blp';
const description = `A special armor capable of resisting spell damage.

|cffffcc00Resistance:|r +7

|cFF808080Incoming spell damage is reduced by the amount of resistance you have.|r`;

export class MoonArmor extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
