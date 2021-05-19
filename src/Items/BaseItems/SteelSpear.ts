import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03D');
const name = 'Steel Spear';
const labels: ItemLabel[] = [ItemLabel.PIERCING];
const goldCost = 525;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNSteelRanged.blp';
const description = `A deadly sharp steel spear.

|cffffcc00Piercing:|r +25

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class SteelSpear extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
