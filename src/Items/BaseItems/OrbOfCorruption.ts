import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I04Z');
const name: string = 'Orb of Corruption';
const labels: ItemLabel[] = [];
const goldCost: number = 550;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfCorruption.blp';
const description: string = `This orb is filled with something... you need...

|cffffcc00Unique:|r Decreases the armor of attacked units by 2

|cFF808080Unique item effects do not stack with each others.|r`;

export class OrbOfCorruption extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
