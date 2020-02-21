import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03D');
const name: string = 'Steel Spear';
const labels: ItemLabel[] = [ItemLabel.PIERCING];
const goldCost: number = 774;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSteelRanged.blp';
const description: string = `A deadly sharp steel spear.

|cffffcc00Piercing:|r +18

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class SteelSpear extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
