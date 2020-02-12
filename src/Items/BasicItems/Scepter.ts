import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I010');
const name: string = 'Scepter';
const labels: ItemLabel[] = [];
const goldCost: number = 400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPriestAdept.blp';
const description: string = `A magical scepter showing high status and wealth.

|cffffcc00Effect:|r Spawn 3 Footmen to fight for you.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class Scepter extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
