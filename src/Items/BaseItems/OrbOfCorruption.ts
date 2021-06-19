import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I04Z');
const name = 'Orb of Corruption';
const labels: ItemLabel[] = [];
const goldCost = 300;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfCorruption.blp';
const description = `This orb is filled with something... you need...

|cffffcc00Unique:|r Decreases the armor of attacked units by 2

|cFF808080Unique item effects do not stack with each others.|r`;

export class OrbOfCorruption extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
